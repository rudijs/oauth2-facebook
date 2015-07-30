declare module UUID {

    interface UUIDStatic {

        /**
         * Generates a version 4 {@link UUID}.
         * @returns {string} A version 4 UUID string.
         */
        v4(): string;

    }
}

declare var uuid:  UUID.UUIDStatic;

declare module "uuid" {
    export = uuid;
}
