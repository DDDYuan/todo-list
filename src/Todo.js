import React, { Component } from "react";

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
    items.splice(items.findIndex(item => item.id == id), 1);
    this.setState({ items });
  };

  changeItemValue = (id, value) => {
    const items = this.state.items;
    const item = items.find(item => item.id == id);
    item.value = value;
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

  changeItemEditableStatus = id => {
    const items = this.state.items;
    const item = items.find(item => item.id == id);
    item.readonly = !item.readonly;
    this.setState({ items });
  };

  changeCheckStatus = id => {
    const items = this.state.items;
    const item = items.find(item => item.id == id);
    item.checked = !item.checked;
    this.setState({ items });
  };

  render() {
    return (
      <div>
        <FilterForm findItems={this.findItems} />
        <List
          items={this.state.items}
          changeItemEditableStatus={this.changeItemEditableStatus}
          changeItemValue={this.changeItemValue}
          removeItem={this.removeItem}
          changeCheckStatus={this.changeCheckStatus}
        />
        <AddItemForm addItem={this.addItem} />
      </div>
    );
  }
}

class List extends Component {
  onChangeEditableStatus = event => {
    this.props.changeItemEditableStatus(
      event.currentTarget.parentElement.getAttribute("item-id")
    );
  };

  onChangeValue = event => {
    this.props.changeItemValue(
      event.currentTarget.parentElement.getAttribute("item-id"),
      event.currentTarget.value
    );
  };

  onRemoveItem = event => {
    this.props.removeItem(
      event.currentTarget.parentElement.getAttribute("item-id")
    );
  };

  onCheckChange = event => {
    this.props.changeCheckStatus(
      event.currentTarget.parentElement.getAttribute("item-id")
    );
  };

  render() {
    return this.props.items.filter(item => item.visible === true).map(item => (
      <div key={item.id} item-id={item.id}>
        <input
          type="checkbox"
          checked={item.checked}
          onChange={this.onCheckChange}
        />
        <input
          type="text"
          value={item.value}
          readOnly={item.readonly}
          disabled={item.checked}
          onDoubleClick={this.onChangeEditableStatus}
          onChange={this.onChangeValue}
        />
        <button onClick={this.onRemoveItem}>×</button>
      </div>
    ));
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
        visible: true,
        checked: false
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
