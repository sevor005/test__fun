import React, {Component} from 'react';
import styles from './RoutePoint.module.css';

const pathImgDelete = 'https://www.clipartmax.com/png/middle/209-2095674_trash-bin-comments-waste.png';

class RoutePoint extends Component {

  state = {
    editMode: false,
    title: this.props.point.title
  }

  goToEditMode = () => this.setState({ editMode: true });

  changeTitle = event => this.setState({ title: event.currentTarget.value });

  saveTitlePoint = event => {
    const {title} = this.props.point
    const newTitle = event.currentTarget.value;

    if(newTitle !== '') {
      this.setState({editMode: false, title: newTitle})
    } else {
      this.setState({editMode: false, title})
    }
  }

  deletePoint = () => {
    const {deleteCallback, point} = this.props;
    deleteCallback(point.id)
  }

  render() {
    const {title} = this.state
    let displayElement = '';

    if(this.state.editMode) {
      displayElement = <input
                          value={title}
                          onChange={this.changeTitle}
                          onBlur={this.saveTitlePoint}
                          className={styles.editField}
                        />
    } else {
      displayElement = <span onDoubleClick={this.goToEditMode}>{title}</span>
    }

    return(
      <div className={styles.point}>
        {displayElement}
        <img src={pathImgDelete} alt='X' className={styles.deleteImg} onClick={this.deletePoint} />
      </div>
    )
  }
}

export default RoutePoint;
