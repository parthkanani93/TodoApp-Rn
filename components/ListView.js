import React, {Component} from 'react';
import { connect } from 'react-redux';
import {FlatList, StyleSheet, View} from 'react-native';
import ListItem from './ListItem';
import { toggleStatus } from '../redux/action';

class List extends Component {
  constructor(props) {
    super(props);
    this.renderSeparator = this.renderSeparator.bind(this);
    this.selectedItem = this.selectedItem.bind(this);
    this.setScrollEnabled = this.setScrollEnabled.bind(this);

    this.state = {
      enable: true,
      data: this.props.data,
      hint : this.props.hint
    };
  }

    static getDerivedStateFromProps(props, state) {
        if (props.data.length != state.data.length) {
            return {
                data: props.data,
            };
        }
        return state.data;
    }

  renderSeparator() {
    return (
      <View style={styles.separatorViewStyle}>
        <View style={styles.separatorStyle} />
      </View>
    );
  }

    selectedItem(item) {
        this.props.toggleItemId(item.id)
    }

  setScrollEnabled(enable) {
    this.setState({
      enable,
    });
  }

  renderItem(item, hint) {
    return (
      <ListItem
        hint = {hint}
        item = {item}
        selectedItem={this.selectedItem}
        setScrollEnabled={enable => this.setScrollEnabled(enable)}
      />
    );
  }

  render() {
    return (
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={this.state.data}
        ItemSeparatorComponent={this.renderSeparator}
        renderItem={({item}) => this.renderItem(item, this.state.hint)}
        scrollEnabled={this.state.enable}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleItemId: (value) => dispatch(toggleStatus(value))
    }
}

export default connect(null,mapDispatchToProps)(List);

const styles = StyleSheet.create({
  separatorViewStyle: {
    backgroundColor: '#FFF',
  },
  separatorStyle: {
    height: 2,
    backgroundColor: '#A6A6A6',
  },
});