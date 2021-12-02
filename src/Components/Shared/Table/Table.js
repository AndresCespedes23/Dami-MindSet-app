import React from 'react';
import Button from '../Button';
import styles from './table.module.css';

function Table({ headers, elements, tableData, deleteAction, updateAction }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {elements.map((element) => {
          return (
            <tr key={element._id}>
              {tableData.map((data, index) => {
                return <td key={index}>{element[data]}</td>;
              })}
              <td>
                <Button type="delete" onClick={() => deleteAction(element._id)} />
                <Button type="update" onClick={() => updateAction(element._id)} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
