import { useState } from "react";
import DarkModeToggle from "react-dark-mode-toggle";
import styled from "styled-components";

const DarkButtonCss = styled.a`
  position: fixed;
  top: 35px;
  right: 50px;
`;

function Darkbutton() {
  const [isDarkMode, setIsDarkMode] = useState(() => false);
  return (
    <DarkButtonCss>
      <DarkModeToggle onChange={setIsDarkMode} checked={isDarkMode} size={80} />
    </DarkButtonCss>
  );
}

export default Darkbutton;
