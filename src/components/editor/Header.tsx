import React from 'react';

type Props = {
  isNew: boolean;
  title: string;
  handleInput: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  handleEdit: (ev: React.MouseEvent<HTMLButtonElement>) => void;
};

const Header = ({
  title,
  handleInput,
  handleSave,
  handleEdit,
  isNew,
}: Props) => {
  console.log('header');
  return (
    <div className="w-full flex gap-7">
      <input
        className="grow border-b p-2 bg-neutral-100/60 rounded-md shadow-sm outline-none"
        type="text"
        value={title}
        onChange={handleInput}
      />

      {isNew ? (
        <button
          onClick={handleSave}
          className="py-3 px-5 border rounded-md border-neutral-300 shadow-sm"
        >
          save
        </button>
      ) : (
        <button
          onClick={handleEdit}
          className="py-3 px-5 border rounded-md border-neutral-300 shadow-sm"
        >
          edit
        </button>
      )}
    </div>
  );
};

export default React.memo(Header);
