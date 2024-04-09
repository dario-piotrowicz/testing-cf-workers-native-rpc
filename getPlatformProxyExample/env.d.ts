interface Env extends WranglerEnv {
    SUM: {
        sum(args: number[]): Promise<number>;
    }
}