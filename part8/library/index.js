const { ApolloServer, UserInputError, gql } = require('apollo-server')
const { v1: uuid } = require("uuid");
const Book = require("./schema/bookSchema")
const Author = require("./schema/authorSchema")
const User = require("./schema/userSchema")
const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'


const MONGODB_URI = "mongodb://localhost:27017/library"

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })


const typeDefs = gql`
    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
    }
    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String]!
        ): Book,
        
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author,
        
        createUser(
            username: String!
            favouriteGenre: String!
        ): User
        
        login(
            username: String!
            password: String!
        ): Token
    }
    type Author {
        name: String!
        id: ID!
        born: Int,
        bookCount: Int
    }
    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String]!
    }
    type User {
        username: String!
        id: ID!,
        favouriteGenre: String!
    }
    type Token {
        value: String!
    }
`

const resolvers = {
    Query: {
        bookCount: async (root, args) => Book.find({author: args.name}),
        authorCount: async () => Author.collection.countDocuments(),
        allAuthors: async () => Author.find({}),
        allBooks: async (root, args) => {
            if (args.author && args.genre) {
                const author = await Author.findOne({ name: args.author });
                return Book.find({
                    $and: [
                        { author: { $in: author.id } },
                        { genres: { $in: args.genre } },
                    ],
                }).populate("author");
            }

            if (args.author) {
                const author = await Author.findOne({ name: args.author });
                return Book.find({ author: { $in: author.id } }).populate("author");
            }

            if (args.genre) {
                return Book.find({ genres: { $in: args.genre } }).populate("author");
            }

            return Book.find({}).populate("author");
        },
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Mutation: {
        addBook: async(root, args) => {
            let author = await Author.findOne({ name: args.author });
            if (!author) {
                author = new Author({ name: args.author });

                try {
                    await author.save();
                } catch (error) {
                    throw new UserInputError(error.message, { invalidArgs: args });
                }
            }
            try {
                const book = new Book({...args, author: author.id})
                await book.save()
            } catch (e) {
                throw new UserInputError(e.message, {
                    invalidArgs: args,
                })
            }

        },
        editAuthor: async (root, args) => {
            const author = await Author.findOne({name: args.name})
            author.born = args.setBornTo
            try {
               await author.save()
                return author
            } catch (e) {
                throw new UserInputError(e.message, {
                    invalidArgs: args,
                })
            }
        },
        createUser: async (root, args) => {
            const user = new User({ username: args.username })

            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if ( !user || args.password !== 'secret' ) {
                throw new UserInputError("wrong credentials")
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        },

    },
    Author: {
        bookCount: async (root) => await Book.find({author: root.id}).countDocuments(),
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id).populate('favourites')
            return { currentUser }
        }
    }
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
