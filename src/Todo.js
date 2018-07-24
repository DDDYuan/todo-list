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
    items.splice(items.findIndex(item => item.id === id), 1);
    this.setState({ items });
  };

  changeItemValue = (id, value) => {
    const items = this.state.items;
    const item = items.find(item => item.id === id);
    item.value = value;
    this.setState({ items });
  };

  findItems = filter => {
    const items = this.state.items;
    items.forEach(item => (item.visible = true));
    items
      .filter(item => !new RegExp(filter).test(item.value))
      .forEach(item => (item.visible = false));
    this.setState({ items });
  };

  changeItemEditableStatus = (id, status) => {
    const items = this.state.items;
    const item = items.find(item => item.id === id);
    item.readonly = status;
    this.setState({ items });
  };

  changeCheckStatus = id => {
    const items = this.state.items;
    const item = items.find(item => item.id === id);
    item.checked = !item.checked;
    this.setState({ items });
  };

  render() {
    return (
      <div>
        <h1>TODO List</h1>
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
  getItemId = event => {
    return parseInt(
      event.currentTarget.parentElement.getAttribute("item-id"),
      10
    );
  };

  onEdit = event => {
    this.props.changeItemEditableStatus(this.getItemId(event), false);
  };

  onLeaveEdit = event => {
    this.props.changeItemEditableStatus(this.getItemId(event), true);
  };

  onChangeValue = event => {
    this.props.changeItemValue(
      this.getItemId(event),
      event.currentTarget.value
    );
  };

  onRemoveItem = event => {
    this.props.removeItem(this.getItemId(event));
  };

  onCheckChange = event => {
    this.props.changeCheckStatus(this.getItemId(event));
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
          onBlur={this.onLeaveEdit}
          onDoubleClick={this.onEdit}
          onChange={this.onChangeValue}
          style={item.checked ? { background: "grey" } : {}}
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
