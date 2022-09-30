/** @type {import('ts-jest').JestConfigWithTsJest} */
import { defaults as tsjPreset } from 'ts-jest/presets';

export default {
    preset: '@shelf/jest-mongodb',
    transform: tsjPreset.transform,
    testEnvironment: 'node',
};