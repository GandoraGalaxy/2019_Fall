import React from 'react';

class TodoItems extends React.Component {
  state = {
    edit: false,
    id: null,
    mockData: [{
      id: '1',
      title: 'Buy Milk',
      done: false,
      date: new Date()
    },
    {
      id: '2',
      title: 'Meeting with Ali',
      done: false,
      date: new Date()
    },
    {
      id: '3',
      title: 'Tea break',
      done: false,
      date: new Date()
    }, 
    {
      id: '4',
      title: 'Go for a run.',
      done: false,
      date: new Date()
    }]
  }

  onSubmitHandle(event) {
    event.preventDefault();

    this.setState({
      mockData: [...this.state.mockData, {
        id: Date.now(),
        title: event.target.item.value,
        done: false,        
        date: new Date()
      }]
    });

    event.target.item.value = '';
  }

  renderEditForm() {
    if (this.state.edit) {
      return(
        <form onSubmit={this.onUpdateHandle.bind(this)}>
            <input type="text" name="updatedItem" className="item" defaultValue={this.state.title} />
            <button className="update-add-item">Update</button>
        </form>
      ); 
    }
  }

  onEditHandle(event) {
    this.setState({
      edit: true,
      id: arguments[0],
      title: arguments[1]
    });
  }

  onUpdateHandle(event) {
    /*event.preventDefault();*/
    this.setState({
      mockData: this.state.mockData.map(item => {
        if (item.id === this.state.id) {
          item['title'] = event.target.updatedItem.value;
          return item;
        }
        return item;
      })
    });
    this.setState({
      edit: false
    });
  }

  onDeleteHandle() {
    let id = arguments[0];
    this.setState({
      mockData: this.state.mockData.filter(item => {
        if (item.id !== id) {
          return item;
        }
      })
    });
  }

  onCompleteHandle() {
    let id = arguments[0];
    this.setState({
      mockData: this.state.mockData.map(item => {
        if (item.id === id) {
          item['done'] = true;
          return item;
        }
        return item;
      })
    });
  }

  render() {
    return (
      <div className="todoList">
        <div className="header">
        {this.renderEditForm()}
          <form onSubmit={this.onSubmitHandle.bind(this)}>
            <input type="text" name="item" className="item" />        
            <button className="btn-add-item">Add</button>
          </form>
          <ul>        
            {this.state.mockData.map(item => (
              <li className={ item.done ? 'done' : 'hidden' } key={item.id}>
                {item.title}           
                <button onClick={this.onDeleteHandle.bind(this, item.id)}>Delete</button>            
                <button onClick={this.onEditHandle.bind(this, item.id, item.title)}>Edit</button>   
                <button onClick={this.onCompleteHandle.bind(this, item.id)}>Complete</button>
              </li>))
            }
          </ul>
        </div>
      </div>
    );
  }
};
   
export default TodoItems;
