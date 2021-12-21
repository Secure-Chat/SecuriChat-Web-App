//imports
import React from 'react';
import { connect } from 'react-redux';

//components

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {

};

export default connect(mapStateToProps, mapDispatchToProps)(function Message(props) {
  return (
    <>
      {props.message.username === props.user.username ? <p className='messageRight'>{props.message.text}</p> : <p className='messageLeft'>{props.message.text}</p>}
    </>
  );
});
