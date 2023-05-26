import React from 'react';

// メニューアイテムの型定義
interface MenuItem {
  label: string;
  action: () => void;
}

// メニューバーコンポーネント
const MenuBar: React.FC<{ items: MenuItem[] }> = ({ items }) => {
  return (
    <ul className="menu-bar">
      {items.map((item, index) => (
        <li key={index} onClick={item.action}>
          {item.label}
        </li>
      ))}
    </ul>
  );
};

// メニューアイテムの動作例
const openFile = () => {
  console.log('To Doリスト');
};

const saveFile = () => {
  console.log('カレンダー');
};

// メニューバーコンポーネントの使用例
const App: React.FC = () => {
  // メニューアイテムの配列
  const menuItems: MenuItem[] = [
    { label: 'To Do リスト', action: openFile },
    { label: 'カレンダー', action: saveFile },
    { label: '在室状況', action: saveFile },
  ];

  return (
    <div className="menubar">      
      <MenuBar items={menuItems} />
    </div>
  );
};

export default App;