import * as React from "react";

const Logo: React.FC<React.SVGProps<SVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    fill="none"
    viewBox="0 0 40 40"
  >
    <path
      fill="#FFFAEF"
      d="m34.24 12.368-6.172 3.994 2.551 4.415c1.325-1.129 5.506-3.411 5.906-5.946.324-2.05-.88-2.495-2.286-2.463"
    ></path>
    <path
      fill="#FFFAEF"
      stroke="#1A1A1A"
      strokeWidth="2.27"
      d="M34.389 34.908Zm-2.483-4.577c.535 2.178 1.165 3.791 1.757 4.852a8 8 0 0 1-.674.148c-1.286.225-3 .24-4.47-.25l-1.102-.367-.342 1.11a.47.47 0 0 1-.265.322c-.168.082-.446.143-.854.133-.82-.02-1.792-.314-2.44-.596l-.985-.428-.482.962c-.107.215-.218.286-.31.322-.12.047-.315.073-.607.027-.605-.096-1.3-.449-1.754-.769l-1.145-.808-.552 1.288c-.144.335-.296.456-.392.509-.105.058-.26.095-.497.073-.396-.038-.853-.23-1.23-.458l-2.87-10.911-.017-.064-.024-.062-3.942-10.05c-1.273-3.976-.217-6.93 1.895-8.94 2.185-2.079 5.606-3.24 9.106-3.24 3.33 0 6.002 1.51 7.875 4.016 1.893 2.531 2.983 6.107 2.983 10.17 0 5.677.588 9.954 1.338 13.011Z"
    ></path>
    <path
      fill="#000"
      d="M17.215 31.44c.619 2.414.258 3.585 0 3.869h1.16c-.247-1.176-.876-3.07-1.16-3.869"
    ></path>
    <ellipse
      cx="15.377"
      cy="11.341"
      fill="#000"
      rx="2.06"
      ry="3.532"
      transform="rotate(15.724 15.377 11.34)"
    ></ellipse>
    <ellipse
      cx="23.364"
      cy="11.452"
      fill="#000"
      rx="2.06"
      ry="3.532"
      transform="rotate(-20.992 23.364 11.452)"
    ></ellipse>
    <ellipse
      cx="19.702"
      cy="18.272"
      fill="#000"
      rx="1.228"
      ry="2.105"
      transform="rotate(-4.293 19.702 18.272)"
    ></ellipse>
    <g filter="url(#a)">
      <path
        fill="#000"
        d="M21.552 31.574c.123.31.31 2.398.387 3.404h.85c-1.794-3.837-1.47-5.467-1.083-5.803-.541.387-.309 2.012-.154 2.399"
      ></path>
    </g>
    <path
      fill="#000"
      d="M26.89 30.318c-.62 1.362 0 4.539.386 5.958l1.084-.155c-1.3-1.98-1.522-4.694-1.47-5.803"
    ></path>
    <path
      fill="#FFFAEF"
      d="m6.38 16.676 7.12 1.826-1.016 4.996c-1.614-.649-6.304-1.484-7.49-3.76-.958-1.842.042-2.646 1.386-3.062"
    ></path>
    <path
      stroke="#000"
      strokeLinejoin="round"
      strokeWidth="2.307"
      d="M10.608 18.796 6.52 16.94c-1.272-.401-2.343 1.22-1.385 3.061 1.185 2.277 5.875 3.112 7.49 3.761M30.574 15.588l3.62-2.926c1.08-.785 2.61.412 2.286 2.462-.4 2.536-4.581 4.818-5.906 5.946"
    ></path>
    <path
      fill="#F2FBF1"
      d="m31.685 15.908 1.57 1.944-3.628 2.83-1.284-2.57z"
    ></path>
    <defs>
      <filter
        id="a"
        width="2.935"
        height="7.316"
        x="20.611"
        y="29.175"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        ></feColorMatrix>
        <feOffset dy="0.757"></feOffset>
        <feGaussianBlur stdDeviation="0.378"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_4814_18"
        ></feBlend>
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_4814_18"
          result="shape"
        ></feBlend>
      </filter>
    </defs>
  </svg>
);

export default Logo;
