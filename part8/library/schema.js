const typeDefinitions = `
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
    type Subscription {
        bookAdded: Book!
    }
`
module.exports = typeDefinitions
