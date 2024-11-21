import React, { useState } from 'react';
import './App.css'; 

// данные в массиве
const App = () => {
  const [computers] = useState([
    { id: 1, ip: '192.168.10.1', hostname: 'User-PC', os: 'Windows 11', serial: 'FAKD412690FDASKDHK' },
    { id: 2, ip: '192.168.10.1', hostname: 'User-PC', os: 'Windows 10', serial: 'FAKD412690FDASKDHK' },
    { id: 3, ip: '192.168.10.1', hostname: 'User-PC', os: 'Windows 7', serial: 'FAKD412690FDASKDHK' },
    { id: 4, ip: '192.168.10.1', hostname: 'User-PC', os: 'Window 10', serial: 'FAKD412690FDASKDHK' },
    { id: 5, ip: '192.168.10.1', hostname: 'User-PC', os: 'Window 10', serial: 'FAKD412690FDASKDHK' },
    { id: 6, ip: '192.168.10.1', hostname: 'User-PC', os: 'Window 10', serial: 'FAKD412690FDASKDHK' },
    { id: 7, ip: '192.168.10.1', hostname: 'User-PC', os: 'Window 10', serial: 'FAKD412690FDASKDHK' },
  ]);

  //Эта строка использует хук состояния useState, чтобы создать состояние selected для хранения выбранных элементов.
  const [selected, setSelected] = useState(new Set());
  // Здесь снова используется useState, чтобы создать состояние selectedComputers
  const [selectedComputers, setSelectedComputers] = useState([]);

  //логика выбора
  const handleSelect = (id) => {
    const newSelected = new Set(selected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelected(newSelected);
  };

  //переключение всех компьютеров
  const toggleSelectAll = () => {
    if (selected.size === computers.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(computers.map(computer => computer.id)));
    }
  };

  //Функция handleSave фильтрует массив computers, чтобы создать массив selectedList, включающий только те компьютеры, которые имеют идентификаторы в наборе selected.
  const handleSave = () => {
    const selectedList = computers.filter(comp => selected.has(comp.id));
    setSelectedComputers(selectedList);
  };

  //вывод из массива
  return (
    <div className="container">
      <h3>Выберите компьютеры:</h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Выбрать</th>
              <th>ID</th>
              <th>IP</th>
              <th>HOSTNAME</th>
              <th>OS</th>
              <th>SERIAL</th>
            </tr>
          </thead>
          <tbody>
            {computers.map(computer => (
              <tr
                key={computer.id}
                className={selected.has(computer.id) ? 'selected' : ''}
                onClick={() => handleSelect(computer.id)}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selected.has(computer.id)}
                    onChange={() => handleSelect(computer.id)}
                  />
                </td>
                <td>{computer.id}</td>
                <td>{computer.ip}</td>
                <td>{computer.hostname}</td>
                <td>{computer.os}</td>
                <td>{computer.serial}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="button-container">
        <button onClick={toggleSelectAll} style={{ backgroundColor: '#0d6fef' }}>Выбрать всё</button>
        <button onClick={() => setSelected(new Set())} style={{ backgroundColor: '#ef0d0d' }}>Снять выделение</button>
        <button onClick={handleSave} style={{ backgroundColor: '#4caf50' }}>Сохранить</button>
      </div>
      <div className="selected-list">
        {selectedComputers.map(comp => (
          <div key={comp.id}>
            {`${comp.hostname} - ${comp.os}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;