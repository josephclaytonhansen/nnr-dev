export const admin = (req, res, next) => {
    if(req.user && req.user.permissions.includes('is-admin')) {
        next()
    } else {
        res.status(401).send({message: 'Not authorized'})
    }
}

export const isUser = (req, res, next) => {
    if(req.user && req.user.permissions.includes('is-user')) {
        next()
    } else {
        res.status(401).send({message: 'Not authorized'})
    }
}

export const isCommentor = (req, res, next) => {
    if(req.user && req.user.permissions.includes('is-commentor')) {
        next()
    } else {
        res.status(401).send({message: 'Not authorized'})
    }
}

export const isSelfEmailEditor = (req, res, next) => {
    if(req.user && req.user.permissions.includes('is-self-email-editor')) {
        next()
    } else {
        res.status(401).send({message: 'Not authorized'})
    }
}

export const isSelfDisplayNameEditor = (req, res, next) => {
    if(req.user && req.user.permissions.includes('is-self-display-name-editor')) {
        next()
    } else {
        res.status(401).send({message: 'Not authorized'})
    }
}

export const isSelfCommentEditor = (req, res, next) => {
    if(req.user && req.user.permissions.includes('is-self-comment-editor')) {
        next()
    } else {
        res.status(401).send({message: 'Not authorized'})
    }
}

export const isSelfPasswordEditor = (req, res, next) => {
    if(req.user && req.user.permissions.includes('is-self-password-editor')) {
        next()
    } else {
        res.status(401).send({message: 'Not authorized'})
    }
}

export const isSelfCommentDeleter = (req, res, next) => {
    if(req.user && req.user.permissions.includes('is-self-comment-deleter')) {
        next()
    } else {
        res.status(401).send({message: 'Not authorized'})
    }
}

export const isSelfCommentFlagger = (req, res, next) => {
    if(req.user && req.user.permissions.includes('is-self-comment-flagger')) {
        next()
    } else {
        res.status(401).send({message: 'Not authorized'})
    }
}

export const isAuthor = (req, res, next) => {
    if(req.user && req.user.permissions.includes('is-author')) {
        next()
    } else {
        res.status(401).send({message: 'Not authorized'})
    }
}

export const isModerator = (req, res, next) => {
    if(req.user && req.user.permissions.includes('is-moderator')) {
        next()
    } else {
        res.status(401).send({message: 'Not authorized'})
    }
}