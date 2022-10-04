const Book = require ("./schema/bookSchema");
const Author = require( "./schema/authorSchema");
const {AuthenticationError, UserInputError} = require("apollo-server") ;
const User = require("./schema/userSchema") ;
const jwt = require("jsonwebtoken") ;
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

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
        addBook: async(root, args, context) => {

            if (!context.currentUser) {
                throw new AuthenticationError("not authenticated");
            }

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
                console.log(book, author)
                await pubsub.publish('BOOK_ADDED', { bookAdded: {...args, author} })

                return book
            } catch (e) {
                throw new UserInputError(e.message, {
                    invalidArgs: args,
                })
            }

        },
        editAuthor: async (root, args) => {
            console.log("TRIGGERED EDIT AUTHOR")
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
            try {

                const user = await User.findOne({ username: args.username })
                if ( !user || args.password !== 'secret' ) {
                    throw new UserInputError("wrong credentials")
                }

                const userForToken = {
                    username: user.username,
                    id: user._id,
                }

                return { value: jwt.sign(userForToken, JWT_SECRET) }
            } catch (e) {
                console.log(e)
            }

        },

    },
    Author: {
        bookCount: async (root) => await Book.find({author: root.id}).countDocuments(),
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
        },
    },
}
module.exports = resolvers
