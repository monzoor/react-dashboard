import React, { PureComponent } from 'react';
import {
    Drawer, Tree, Badge,
} from 'antd';

const { TreeNode } = Tree;

const treeData = [
    {
        title: 'Men',
        key: 'men',
        id: 1,
        children: [
            { title: 'Punjabi', key: 'menPunjabi', id: 2 },
            { title: 'Shirt', key: 'menShirt', id: 3 },
            { title: 'Pant', key: 'menPant', id: 4 },
        ],
    },
    {
        title: 'Women',
        key: 'women',
        id: 5,
        children: [
            { title: 'Sharee', key: 'womenSharee', id: 6 },
            { title: 'Kamiz', key: 'womenKamiz', id: 7 },
            { title: 'Jewellery', key: 'womenJewellery', id: 8 },
        ],
    },
    {
        title: 'Children',
        key: 'children',
        id: 9,
    },
];

class Home extends PureComponent {
    state = {
        visible: false,
        // expandedKeys: ['menShirt'],
        expandedKeys: [],
        autoExpandParent: true,
        // checkedKeys: ['menShirt'],
        checkedKeys: [],
        // selectedKeys: [],
        selectedCategoryNames: [],
    };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    onExpand = (expandedKeys) => {
        // console.log('onExpand', expandedKeys);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

    onCheck = (checkedKeys, e) => {
        // console.log('onCheck', checkedKeys);
        const selectedCategoryNames = Object.keys(e).map((nodes) => {
            if (nodes === 'checkedNodes') {
                return Object.keys(e.checkedNodes).map(props => e.checkedNodes[props].props);
            }
            return null;
        }).filter(items => (items !== null)).flat();

        this.setState({ checkedKeys, selectedCategoryNames });
        const { onUpdate } = this.props;
        onUpdate(checkedKeys);
    }

    // onSelect = (selectedKeys, info) => {
    //     console.log('onSelect', info);
    //     // this.setState({ selectedKeys });
    // }

    renderTreeNodes = data => data.map((item) => {
        if (item.children) {
            return (
                <TreeNode title={item.title} key={item.key} dataRef={item}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            );
        }
        return <TreeNode {...item} />;
    })


    render() {
        const {
            visible,
            expandedKeys,
            autoExpandParent,
            checkedKeys,
            selectedKeys,
            selectedCategoryNames,
        } = this.state;

        const RenderCategory = () => {
            if (selectedCategoryNames.length === 0) {
                return (
                    <span className="badge badge-warning font-weight-light pointer">
                        Add Category
                    </span>
                );
            }
            const Categories = () => (
                selectedCategoryNames.map(items => (
                    <span key={items.title} className="badge badge-success font-weight-light mr-2 pointer">{items.title}</span>
                ))
            );

            return (
                <span>
                    <p className="mb-2 text-muted font-weight-light">Categories: </p>
                    <Categories />
                </span>
            );
        };

        return (
            <div>
                <Badge onClick={this.showDrawer}>
                    <RenderCategory />
                </Badge>
                <Drawer
                  title={(<span className="text-primary">Select Category</span>)}
                  placement="right"
                  closable={false}
                  onClose={this.onClose}
                  visible={visible}
                >
                    <Tree
                      checkable
                      onExpand={this.onExpand}
                      expandedKeys={expandedKeys}
                      autoExpandParent={autoExpandParent}
                      onCheck={this.onCheck}
                      checkedKeys={checkedKeys}
                      onSelect={this.onSelect}
                      selectedKeys={selectedKeys}
                    >
                        {this.renderTreeNodes(treeData)}
                    </Tree>

                </Drawer>
            </div>
        );
    }
}

export default Home;
