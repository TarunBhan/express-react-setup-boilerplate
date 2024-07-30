import { FC } from "react";

const Input: FC<{
  name?: string;
  width?: string;
  onChangeCallBack: (event: any) => void;
  placeHolder: string;
  type?: string;
}> = ({
  name,
  width = "100%",
  onChangeCallBack,
  placeHolder,
  type = "text",
}) => {
  return (
    <div style={{ width: "100%" }}>
      {/* {label && (
        <div>
          <p>Input</p>
        </div>
      )} */}
      <input
        placeholder={placeHolder}
        type={type}
        name={name}
        onChange={onChangeCallBack}
        style={{
          borderRadius: "12px",
          border: "1px solid black",
          padding: 5,
          // borderColor: "transpare",
          width: width,
        }}
      />
    </div>
  );
};
export default Input;
