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
    if (filter.length === 0) {
      items.forEach(item => (item.visible = true));
    } else {
      items
        .filter(item => !new RegExp(filter).test(item.value))
        .forEach(item => (item.visible = false));
    }
    this.setState({ items });
  };

  render() {
    return (
      <div>
        <FilterForm findItems={this.findItems} />
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

class FilterForm extends Component {
  constructor(props) {
    super(props);
    this.filter = null;
  }

  filterItem = () => {
    this.props.findItems(this.filter.value);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          ref={node => (this.filter = node)}
          placeholder="Input To Filter Items"
          onChange={this.filterItem}
        />
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
          ref={node => (this.input = node)}
          type="text"
          placeholder="Input To Add a Item"
        />
        <button onClick={this.addItem}>ADD</button>
      </div>
    );
  }
}

export default Todo;
