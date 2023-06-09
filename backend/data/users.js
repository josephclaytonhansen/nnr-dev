const users = [
    {
        displayName: "Test User",
        email: 'email@email.com',
        password: 'password',
    },
    {
        displayName: "Test User (Banned)",
        email: 'email2@email.com',
        password: 'password',
        permissions: 'is-user.is-banned'
    },
    {
        displayName: "Test User (Author)",
        password: 'password',
        email: 'email3@email.com',
        permissions: 'is-user.is-author.is-commentor.is-flagger'
    },
    {
        displayName: "Test User (Moderator)",
        password: 'password',
        permissions: 'is-user.is-moderator.is-commentor.is-flagger.is-self-email-editor.is-self-display-name-editor.is-self-comment-editor',
        email: 'email4@email.com'
    },
    {
        displayName: "Test User (Admin)",
        password: 'password',
        permissions: 'is-user.is-admin.is-moderator.is-author.is-commentor.is-flagger.is-self-email-editor.is-self-display-name-editor.is-self-comment-editor',
        email: 'email5@email.com'
    },
    {
        displayName: "John Doe",
        password: 'password',
        email: "john@email.com",
    },
    {
        displayName: "Jane Doe",
        password: 'password',
        email: "jane@email.com",
    },

]

export default users