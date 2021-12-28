import React from 'react';
import { Paper } from '@mui/material';

export default function ContactSettings(props) {

  return (
    <>
      <Paper>
        {props.darkMode ? (
          <button onClick={() => props.setEncryptionStatus(!props.encryptionStatus)}/>
        ):(
          <button onClick={() => props.setEncryptionStatus(!props.encryptionStatus)}/>
        )}
      </Paper>
    </>
  )
}