import React, { Component } from "react";
import _ from "lodash";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  addItem = item => {
    this.setState({
      items: [...this.state.items, item]
    });
  };

  removeItem = id => {
    const items = this.state.items;
    _.remove(items, item => item.id === id);
    this.setState({ items });
  };

  changeItemValue = (id, value) => {
    const items = this.state.items;
    _.find(items, item => item.id === id).value = value;
    this.setState({ items });
  };

  findItems = filter => {
    const items = this.state.items;
    items
      .filter(item => !new RegExp(filter).test(item.value))
      .forEach(item => (item.visible = false));
    this.setState({ items });
  };

  render() {
    return (
      <div>
        <div>
          <input type="text" />
        </div>
        {this.state.items.filter(item => item.visible === true).map(item => (
          <div key={item.id}>
            <input type="checkbox" />
            <input type="text" value={item.value} readOnly={item.readonly} />
          </div>
        ))}
        <AddItemForm addItem={this.addItem} />
      </div>
    );
  }
}

class AddItemForm extends Component {
  constructor(props) {
    super(props);
    this.input = null;
  }

  addItem = () => {
    if (this.input.value.length > 0) {
      this.props.addItem({
        id: new Date().getTime(),
        value: this.input.value,
        readonly: true,
        visible: true
      });
      this.input.value = "";
    }
  };

  render() {
    return (
      <div>
        <input
          ref={node => {
            this.input = node;
          }}
          type="text"
        />
        <button onClick={this.addItem}>ADD</button>
      </div>
    );
  }
}

export default Todo;
