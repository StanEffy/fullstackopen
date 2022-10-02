const { ApolloServer, UserInputError, gql } = require('apollo-server')
const { v1: uuid } = require("uuid");
const Book = require("./schema/bookSchema")
const Author = require("./schema/authorSchema")

const MONGODB_URI = "mongodb://localhost:27017/library"

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })
let authors = [
    {
        name: 'Robert Martin',
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821
    },
    {
        name: 'Joshua Kerievsky', // birthyear not known
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    {
        name: 'Sandi Metz', // birthyear not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
]

let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ['agile', 'patterns', 'design']
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'patterns']
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'design']
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'crime']
    },
    {
        title: 'The Demon',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'revolution']
    },
]

const typeDefs = gql`
    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
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
        ): Author
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
        author: String!
        id: ID!
        genres: [String]!
    }
`

const resolvers = {
    Query: {
        bookCount: async (root, args) => Book.find({author: args.name}),
        authorCount: async () => Author.collection.countDocuments(),
        allAuthors: async () => Author.find({}),
        allBooks: async (root, args) => {
            if(!args.author && !args.genre){
                return Book.find({})
            }
            if(args.author){
                return Book.find({author: args.author})
            } else if(args.genre){
               return books.filter(b => b.genres.includes(args.genre))
            }
        }
    },
    Mutation: {
        addBook: async(root, args) => {
            const book = new Book({...args})
            try {
                await book.save()
            } catch (e) {
                throw new UserInputError(e.message, {
                    invalidArgs: args,
                })
            }

        },
        editAuthor: async (root, args) => {
            const author = await Author.findOne({...args})
            author.born = args.born
            try {
               await author.save()
            } catch (e) {
                throw new UserInputError(e.message, {
                    invalidArgs: args,
                })
            }
            return author
        },

    },
    Author: {
        bookCount: async (root) => Book.find({name: root.name}).countDocuments(),
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
