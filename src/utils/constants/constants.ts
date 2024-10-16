export enum Role{
    PORTAL_ADMIN = 'PORTAL_ADMIN',
    JOB_PROVIDER = 'JOB_PROVIDER',
    JOB_SEEKER = 'JOB_SEEKER'
}

export enum HttpsResponseStatus {
    FORBIDDEN_MESSAGE = 'User lacks any of the roles PORTAL_ADMIN, JOB_PROVIDER, JOB_SEEKER',
    UNAUTHORIZED_MESSAGE = 'Bad or no authorization token provided'
}