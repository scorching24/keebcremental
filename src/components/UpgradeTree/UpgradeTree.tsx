import {TransformWrapper, TransformComponent} from 'react-zoom-pan-pinch';
import {useTypingStore} from '../../store/useTypingStore';
import {getUpgradeCost} from '../../utils/economy';
import {
    TREE_HEIGHT,
    TREE_WIDTH,
    UPGRADES,
    type UpgradeNode,
} from '../../utils/upgrades';

export function UpgradeTree() {
    const treeOpen = useTypingStore((state) => state.treeOpen);
    const toggleTree = useTypingStore((state) => state.toggleTree);
    const switches = useTypingStore((state) => state.switches);
    const purchasedUpgrades = useTypingStore((state) => state.purchasedUpgrades);
    const buyUpgrade = useTypingStore((state) => state.buyUpgrade);

    if (!treeOpen) return null;

    const nodeById = new Map<string, UpgradeNode>(
        UPGRADES.map((node) => [node.id, node])
    );

    const links = UPGRADES.flatMap((node) =>
        node.requires.flatMap((requiredId) => {
            const from = nodeById.get(requiredId);
            if (!from) return [];

            return [{
                id: `${requiredId}-${node.id}`,
                x1: from.x,
                y1: from.y,
                x2: node.x,
                y2: node.y,
                active: purchasedUpgrades[requiredId] === true,
            }];
        })
    );

    return (
        <div className='tree-backdrop'>
            <div className='tree-window'>
                <header className='tree-header'>
                    <div>
                        <h2>keebtree</h2>
                        <p>spend switches to grow the tree</p>
                    </div>

                    <div className='tree-header-right'>
                        <span>{Math.floor(switches)} switches</span>
                        <button type='button' onClick={toggleTree}>
                            close
                        </button>
                    </div>
                </header>

                <TransformWrapper
                    minScale={.5}
                    maxScale={3}
                    initialScale={1}
                    initialPositionX='center'
                    initialPositionY='center'
                >
                    <TransformComponent wrapperClass='tree-viewport' contentStyle={{width: TREE_WIDTH, height: TREE_HEIGHT}}>
                        <div
                            className='tree-content'
                            style={{width: TREE_WIDTH, height: TREE_HEIGHT}}
                        >
                            <svg
                                className='tree-links'
                                width={TREE_WIDTH}
                                height={TREE_HEIGHT}
                                aria-hidden='true'
                            >
                                {links.map((link) => (
                                    <line
                                        key={link.id}
                                        x1={link.x1}
                                        y1={link.y1}
                                        x2={link.x2}
                                        y2={link.y2}
                                        className={link.active ? 'link active' : 'link'}
                                    />
                                ))}
                            </svg>

                            {UPGRADES.map((node) => {
                                const owned = purchasedUpgrades[node.id] === true;
                                const unlocked = node.requires.every(
                                    (id) => purchasedUpgrades[id] === true
                                );
                                const cost = getUpgradeCost(node);
                                const affordable =
                                    unlocked && !owned && switches >= cost;
                                
                                    return (
                                        <button
                                            key={node.id}
                                            type='button'
                                            className={[
                                                'tree-node',
                                                !unlocked ? 'locked' : '',
                                                owned ? 'owned' : '',
                                                affordable ? 'affordable' : '',
                                            ]
                                                .filter(Boolean)
                                                .join(' ')}
                                            style={{left: node.x, top: node.y}}
                                            disabled={!affordable}
                                            onClick={() => buyUpgrade(node.id)}
                                        >
                                            <span className='tree-node-icon'>
                                                {node.icon}
                                            </span>        

                                            <strong>{node.name}</strong>

                                            <span className='tree-node-description'>
                                                {node.description}
                                            </span>

                                            <span className='tree-node-meta'>
                                                {owned
                                                    ? 'owned'
                                                    : unlocked
                                                        ? `${cost} switches`
                                                        : 'locked'}
                                            </span>
                                        </button>
                                    );
                            })}
                        </div>
                    </TransformComponent>
                </TransformWrapper>
            </div>
        </div>
    );
}