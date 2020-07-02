export class Livestream {
    constructor(
        public id: string,
        public streamURL: string,
        public streamName: string,
        public programType: string,
        public ministerInCharge: string
    )
     { }

}

export class postStream {
    constructor(
        public streamURL: string,
        public streamName: string,
        public programType: string,
        public ministerInCharge: string
    ) { }
}
