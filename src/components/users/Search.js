import React, { Component } from 'react';
import PropTypes from 'prop-types'

export class Search extends Component {

    state = {
        text: ''
    };

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired
    };

    onSumbit = e => {
        e.preventDefault();
        if (this.state.text === '') {
            this.props.setAlert('Please enter a name', 'light')
        } else {
            this.props.searchUsers(this.state.text);
            this.setState({ text: '' });
        };
    };

    // e is 'event parameter
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const { showClear, clearUsers } = this.props;
        return (
            <div>
                <form onSubmit={this.onSumbit} className='form'>
                    <input
                        type='text'
                        name='text' 
                        placeholder='Search Users...' 
                        value={this.state.text}
                        onChange={this.onChange}
                    />
                    <input
                        type='submit'
                        value='Search'
                        className='btn btn-dark btn-block'
                    />
        
                </form>
                {/* && means 'is true' */}
                {showClear &&
                <button className='btn btn-light btn-block' onClick={clearUsers}> Clear </button>}
            </div>
        )
    }
}

export default Search
