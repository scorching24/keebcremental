export type UpgradeEffect =
| {type: 'increaseTime'; value: number}
| {type: 'flatSwitches'; value: number}
| {type: 'percentSwitches'; value: number}
| {type: 'percentBronze'; value: number}

export interface UpgradeNode {
    id: string;
    name: string;
    description: string;
    icon: string;
    cost: number;
    requires: string[];
    effect: UpgradeEffect;
    x: number;
    y: number;
}

export const TREE_WIDTH = 720;
export const TREE_HEIGHT = 520;

export const UPGRADES: UpgradeNode[] = [
    {
        id: 'first-press',
        name: 'first press',
        description: 'the beginning. +1 switch per word.',
        icon: '🜁',
        cost: 24,
        requires: [],
        effect: {type: 'flatSwitches', value: 1},
        x: 360,
        y: 260,
    },
    {
        id: 'printed-circuit-board',
        name: 'printed circuit board',
        description: '',
        icon: '🝪',
        cost: 50,
        requires: ['first-press'],
        effect: {type: 'increaseTime', value: 5},
        x: 360,
        y: 85,
    },
    {
        id:'test',
        name:'test',
        description:'test',
        icon:'test',
        cost: 67,
        requires:['first-press'],
        effect: {type: 'percentSwitches', value: 20},
        x: 360,
        y: 435,
    }
];