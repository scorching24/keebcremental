import { UPGRADES, type UpgradeNode } from './upgrades';

export interface Bonuses {
    increaseTime: number;
    flatSwitches: number;
    percentSwitches: number;
    percentBronze: number;
}

export function getBonuses(purchased: Record<string, boolean>): Bonuses {
    const bonuses: Bonuses = {
        increaseTime: 0,
        flatSwitches: 0,
        percentSwitches: 0,
        percentBronze: 0,
    };

    for (const node of UPGRADES) {
        if (!purchased[node.id]) continue;

        const {type, value} = node.effect;

        if (type === 'increaseTime') bonuses.increaseTime += value;
        if (type === 'flatSwitches') bonuses.flatSwitches += value;
        if (type === 'percentSwitches') bonuses.percentSwitches += value;
        if (type === 'percentBronze') bonuses.percentBronze += value;
    }

    return bonuses;
}

export function getUpgradeCost(node: UpgradeNode): number {
    return node.cost;
}

export function getWordPayout(
    finishedCorrectly: boolean,
    streak: number,
    purchased: Record<string, boolean>
): number {
    if (!finishedCorrectly) return 0;

    const bonuses = getBonuses(purchased);
    const base = 1 + bonuses.flatSwitches;
    const mult = 1 + bonuses.percentSwitches * streak;

    return Math.max(1, Math.round(base * mult));
}