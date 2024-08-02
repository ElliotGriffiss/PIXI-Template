import MersenneTwister from "mersenne-twister";
const generator = new MersenneTwister();

function range(min: number, max: number) {
    return Math.floor(generator.random() * (max - min) ) + min;
}

export default {range};