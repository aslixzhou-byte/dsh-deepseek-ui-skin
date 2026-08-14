window.__ModuleLoader__.load({
	id: "@dsh-external/dsh-client-ui-skin-deepseek-whale",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		//#region src/client/official-wordmark.generated.ts
const OFFICIAL_WORDMARK_LETTERS = [
    "M68.416 18.2447H67.0501V16.1272H68.416C69.2619 16.1272 70.1166 15.9163 70.6671 15.3304C71.2181 14.7444 71.426 13.8455 71.426 12.9471C71.426 12.0487 71.2268 11.1498 70.6671 10.5643C70.1083 9.97831 69.2619 9.76744 68.416 9.76744C67.5701 9.76744 66.7154 9.97831 66.1639 10.5643C65.6129 11.1503 65.4049 12.0487 65.4049 12.9471V21.6435H63.009V7.6582H65.4049V8.54883H65.8442C65.8918 8.49393 65.9394 8.44728 65.9875 8.40064C66.5871 7.85353 67.5049 7.6582 68.4072 7.6582C69.8212 7.6582 71.2341 8.00998 72.1607 8.98662C73.0868 9.96325 73.4143 11.4632 73.4143 12.9558C73.4143 14.4485 73.0785 15.9406 72.1607 16.925C71.2424 17.9094 69.8212 18.2457 68.416 18.2457V18.2447Z",
    "M31.9551 8.03497H33.3204V10.1525H31.9551C31.1087 10.1525 30.2545 10.3633 29.7035 10.9493C29.1525 11.5353 28.945 12.4342 28.945 13.3326C28.945 14.231 29.1447 15.1294 29.7035 15.7154C30.2623 16.3014 31.1087 16.5122 31.9551 16.5122C32.8015 16.5122 33.6562 16.3014 34.2072 15.7154C34.7582 15.1294 34.9657 14.231 34.9657 13.3326V4.62842H37.3611V18.6219H34.9657V17.7313H34.5264C34.4783 17.7857 34.4307 17.8329 34.3826 17.8795C33.7835 18.4261 32.8652 18.6219 31.9629 18.6219C30.5494 18.6219 29.136 18.2707 28.2099 17.294C27.2838 16.3174 26.9563 14.817 26.9563 13.3248C26.9563 11.8327 27.2916 10.34 28.2099 9.35561C29.136 8.37898 30.5494 8.03497 31.9551 8.03497Z",
    "M49.3786 13.1431V13.9948H42.9984V12.2996H47.2305C47.1348 11.6825 46.9113 11.1043 46.5119 10.682C45.9371 10.0727 45.0503 9.85409 44.1723 9.85409C43.2943 9.85409 42.4076 10.0727 41.8328 10.682C41.258 11.2913 41.05 12.2213 41.05 13.1435C41.05 14.0658 41.2575 15.003 41.8328 15.6046C42.4076 16.2061 43.2939 16.433 44.1723 16.433C45.0508 16.433 45.9371 16.2143 46.5119 15.6046C46.5916 15.5186 46.6635 15.4248 46.7354 15.331H49.0992C48.8918 16.0657 48.5643 16.7299 48.0691 17.2454C47.111 18.2531 45.6339 18.6205 44.1723 18.6205C42.7108 18.6205 41.2337 18.2609 40.2755 17.2454C39.3174 16.2299 38.9661 14.6828 38.9661 13.1435C38.9661 11.6043 39.3096 10.0494 40.2755 9.04168C41.242 8.03396 42.7108 7.66663 44.1723 7.66663C45.6339 7.66663 47.111 8.02618 48.0691 9.04168C49.0351 10.0572 49.3786 11.6043 49.3786 13.1435V13.1431Z",
    "M61.4045 13.1431V13.9948H55.0243V12.2996H59.2564C59.1602 11.6825 58.9372 11.1043 58.5378 10.682C57.963 10.0727 57.0762 9.85409 56.1982 9.85409C55.3202 9.85409 54.4335 10.0727 53.8587 10.682C53.2839 11.2913 53.0759 12.2213 53.0759 13.1435C53.0759 14.0658 53.2834 15.003 53.8587 15.6046C54.4335 16.2061 55.3202 16.433 56.1982 16.433C57.0762 16.433 57.963 16.2143 58.5378 15.6046C58.6179 15.5186 58.6894 15.4248 58.7608 15.331H61.1251C60.9171 16.0657 60.5897 16.7299 60.0945 17.2454C59.1364 18.2531 57.6593 18.6205 56.1982 18.6205C54.7372 18.6205 53.2596 18.2609 52.3014 17.2454C51.3432 16.2299 50.9919 14.6828 50.9919 13.1435C50.9919 11.6043 51.3355 10.0494 52.3014 9.04168C53.2678 8.03396 54.7367 7.66663 56.1982 7.66663C57.6598 7.66663 59.1364 8.02618 60.0945 9.04168C61.061 10.0572 61.4045 11.6043 61.4045 13.1435V13.1431Z",
    "M80.242 18.6214C81.7035 18.6214 83.1801 18.4105 84.1383 17.809C85.0965 17.2075 85.4482 16.2931 85.4482 15.3869C85.4482 14.4807 85.1042 13.5585 84.1383 12.9647C83.1801 12.371 81.703 12.1518 80.242 12.1518C79.6186 12.1518 79.0438 12.0658 78.6366 11.8394C78.2294 11.6047 78.0778 11.2534 78.0778 10.9017C78.0778 10.5499 78.2216 10.1908 78.6366 9.9639C79.0438 9.72921 79.6749 9.65147 80.2973 9.65147C80.9198 9.65147 81.5509 9.73747 81.9591 9.9639C82.3663 10.1986 82.5179 10.5499 82.5179 10.9017H84.9531C84.9531 9.99499 84.6421 9.07327 83.7719 8.47951C82.9017 7.88576 81.5679 7.66663 80.2424 7.66663C78.9169 7.66663 77.5837 7.8775 76.713 8.47951C75.8427 9.08104 75.5308 9.99499 75.5308 10.9017C75.5308 11.8083 75.8423 12.73 76.713 13.3238C77.5832 13.9176 78.9165 14.1367 80.2424 14.1367C80.929 14.1367 81.688 14.2227 82.1428 14.4491C82.5985 14.676 82.7579 15.0351 82.7579 15.3869C82.7579 15.7387 82.5985 16.0977 82.1428 16.3246C81.688 16.5511 80.9931 16.6371 80.3066 16.6371C79.62 16.6371 78.9169 16.5511 78.4694 16.3246C78.0224 16.0982 77.8543 15.7387 77.8543 15.3869H75.0435C75.0435 16.2935 75.3865 17.2153 76.3534 17.809C77.3194 18.4028 78.7809 18.6214 80.2424 18.6214H80.242Z",
    "M97.4733 13.1431V13.9948H91.0932V12.2996H95.3252C95.23 11.6825 95.006 11.1043 94.6071 10.682C94.0313 10.0727 93.1456 9.85409 92.2666 9.85409C91.3876 9.85409 90.5018 10.0727 89.927 10.682C89.3522 11.2913 89.1452 12.2213 89.1452 13.1435C89.1452 14.0658 89.3522 15.003 89.927 15.6046C90.5018 16.2061 91.3886 16.433 92.2666 16.433C93.1446 16.433 94.0313 16.2143 94.6071 15.6046C94.6863 15.5186 94.7587 15.4248 94.8301 15.331H97.1935C96.9855 16.0657 96.6585 16.7299 96.1639 17.2454C95.2057 18.2531 93.7281 18.6205 92.2666 18.6205C90.805 18.6205 89.3284 18.2609 88.3703 17.2454C87.4121 16.2299 87.0613 14.6828 87.0613 13.1435C87.0613 11.6043 87.4043 10.0494 88.3703 9.04168C89.3367 8.03396 90.806 7.66663 92.2666 7.66663C93.7272 7.66663 95.2057 8.02618 96.1639 9.04168C97.1298 10.0572 97.4729 11.6043 97.4729 13.1435L97.4733 13.1431Z",
    "M109.499 13.1431V13.9948H103.119V12.2996H107.351C107.256 11.6825 107.032 11.1043 106.632 10.682C106.057 10.0727 105.172 9.85409 104.293 9.85409C103.414 9.85409 102.528 10.0727 101.953 10.682C101.378 11.2913 101.17 12.2213 101.17 13.1435C101.17 14.0658 101.378 15.003 101.953 15.6046C102.528 16.2061 103.415 16.433 104.293 16.433C105.171 16.433 106.057 16.2143 106.632 15.6046C106.712 15.5186 106.784 15.4248 106.856 15.331H109.22C109.012 16.0657 108.685 16.7299 108.19 17.2454C107.231 18.2531 105.754 18.6205 104.293 18.6205C102.831 18.6205 101.355 18.2609 100.396 17.2454C99.4382 16.2299 99.0864 14.6828 99.0864 13.1435C99.0864 11.6043 99.4295 10.0494 100.396 9.04168C101.362 8.03396 102.832 7.66663 104.293 7.66663C105.754 7.66663 107.231 8.02618 108.19 9.04168C109.156 10.0572 109.499 11.6043 109.499 13.1435V13.1431Z",
    "M113.5 4.62817H111.104V18.6217H113.5V4.62817Z",
    "M117.589 12.8154L121.517 18.6208H118.554L114.625 12.8154L118.554 8.15088H121.517L117.589 12.8154Z"
];
const OFFICIAL_WORDMARK_WHALE = "M23.0584 4.95203C22.8129 4.83203 22.7074 5.06103 22.5639 5.17704C22.5149 5.21454 22.4734 5.26354 22.4319 5.30854C22.0734 5.69155 21.6543 5.94306 21.1073 5.91306C20.3073 5.86806 19.6243 6.11957 19.0203 6.73158C18.8918 5.97706 18.4652 5.52655 17.8162 5.23754C17.4767 5.08753 17.1332 4.93703 16.8952 4.61052C16.7292 4.37801 16.6837 4.11901 16.6007 3.8635C16.5477 3.70949 16.4952 3.55199 16.3177 3.52549C16.1252 3.49549 16.0497 3.65699 15.9742 3.792C15.6722 4.34401 15.5552 4.95203 15.5667 5.56805C15.5932 6.95359 16.1782 8.05712 17.3407 8.84215C17.4727 8.93215 17.5067 9.02215 17.4652 9.15366C17.3857 9.42416 17.2917 9.68667 17.2087 9.95718C17.1557 10.1297 17.0767 10.1677 16.8917 10.0922C16.2537 9.82568 15.7027 9.43117 15.2156 8.95465C14.3891 8.15513 13.6416 7.2726 12.7096 6.58158C12.4906 6.42007 12.2716 6.27007 12.045 6.12707C11.094 5.20354 12.1696 4.44502 12.4186 4.35501C12.6791 4.26101 12.5091 3.938 11.6675 3.942C10.826 3.9455 10.056 4.22751 9.07446 4.60302C8.93096 4.65952 8.77995 4.70052 8.62545 4.73452C7.73492 4.56552 6.80989 4.52802 5.84386 4.63702C4.02481 4.83953 2.57177 5.69955 1.50373 7.1676C0.220694 8.93215 -0.0813148 10.9372 0.288196 13.0283C0.676708 15.2323 1.80174 17.0569 3.53029 18.4834C5.32285 19.9625 7.38741 20.6875 9.74298 20.5485C11.1735 20.466 12.7661 20.2745 14.5626 18.7539C15.0156 18.9795 15.4912 19.0695 16.2797 19.137C16.8872 19.1935 17.4722 19.107 17.9252 19.013C18.6347 18.8629 18.5857 18.2059 18.3292 18.0854C16.2497 17.1169 16.7062 17.5109 16.2912 17.1919C17.3477 15.9419 18.9618 13.7198 19.4598 10.6942C19.5088 10.3602 19.5713 9.88968 19.5638 9.61917C19.5598 9.45417 19.5978 9.39016 19.7863 9.37116C20.3073 9.31116 20.8128 9.16866 21.2773 8.91315C22.6249 8.17713 23.1684 6.96809 23.2964 5.51905C23.3154 5.29754 23.2924 5.06853 23.0584 4.95203ZM11.3165 17.9954C9.30097 16.4109 8.32344 15.8894 7.91992 15.9119C7.54241 15.9344 7.61042 16.3664 7.69342 16.6479C7.78042 16.9259 7.89342 17.1174 8.05193 17.3614C8.16143 17.5229 8.23694 17.7629 7.94243 17.9434C7.29341 18.3449 6.16487 17.8084 6.11187 17.7819C4.79833 17.0084 3.7003 15.9874 2.92628 14.5908C2.17875 13.2468 1.74474 11.8047 1.67324 10.2657C1.65424 9.89418 1.76374 9.76267 2.13375 9.69517C2.62077 9.60517 3.12278 9.58617 3.6093 9.65767C5.66636 9.95818 7.41741 10.8777 8.88545 12.3348C9.72348 13.1643 10.3575 14.1558 11.0105 15.1243C11.705 16.1529 12.4521 17.1329 13.4036 17.9364C13.7396 18.2179 14.0076 18.4319 14.2641 18.5899C13.4906 18.6764 12.1996 18.6949 11.3165 17.9964V17.9954ZM12.2826 11.7817C12.2826 11.6167 12.4146 11.4852 12.5806 11.4852C12.6181 11.4852 12.6521 11.4927 12.6826 11.5037C12.7241 11.5187 12.7621 11.5412 12.7921 11.5752C12.8451 11.6277 12.8751 11.7027 12.8751 11.7817C12.8751 11.9467 12.7431 12.0782 12.5771 12.0782C12.4111 12.0782 12.2826 11.9467 12.2826 11.7817ZM15.2831 13.3208C15.0906 13.3998 14.8981 13.4673 14.7131 13.4748C14.4261 13.4898 14.1131 13.3733 13.9431 13.2308C13.6791 13.0093 13.4901 12.8853 13.4111 12.4988C13.3771 12.3338 13.3961 12.0782 13.4261 11.9317C13.4941 11.6162 13.4186 11.4137 13.1961 11.2297C13.0151 11.0797 12.7846 11.0382 12.5316 11.0382C12.4371 11.0382 12.3506 10.9967 12.2861 10.9632C12.1806 10.9107 12.0936 10.7792 12.1766 10.6177C12.2031 10.5652 12.3316 10.4377 12.3616 10.4152C12.7051 10.2197 13.1011 10.2837 13.4676 10.4302C13.8071 10.5692 14.0641 10.8242 14.4336 11.1847C14.8111 11.6202 14.8791 11.7402 15.0941 12.0672C15.2641 12.3228 15.4186 12.5853 15.5247 12.8858C15.5887 13.0733 15.5057 13.2268 15.2831 13.3208Z";

		//#endregion
		//#region src/client/official-path.generated.ts
const OFFICIAL_WHALE_PATH = "M22.9168 1.43018C22.6713 1.31018 22.5658 1.53918 22.4223 1.65519C22.3733 1.69269 22.3318 1.74169 22.2903 1.78669C21.9317 2.1697 21.5127 2.42121 20.9657 2.39121C20.1657 2.34621 19.4827 2.59771 18.8787 3.20973C18.7502 2.45521 18.3236 2.0047 17.6746 1.71569C17.3351 1.56568 16.9916 1.41518 16.7536 1.08867C16.5876 0.856163 16.5421 0.597155 16.4591 0.341647C16.4061 0.187643 16.3536 0.0301382 16.1761 0.00363739C15.9836 -0.0263635 15.9081 0.135141 15.8326 0.270145C15.5306 0.822162 15.4136 1.43018 15.4251 2.0462C15.4516 3.43174 16.0366 4.53527 17.1991 5.3203C17.3311 5.4103 17.3651 5.5003 17.3236 5.63181C17.2441 5.90231 17.1501 6.16482 17.0671 6.43533C17.0141 6.60784 16.9351 6.64584 16.7501 6.57033C16.1121 6.30383 15.5611 5.90931 15.074 5.4328C14.2475 4.63328 13.5 3.75075 12.568 3.05973C12.349 2.89822 12.13 2.74822 11.9034 2.60522C10.9524 1.68169 12.028 0.923165 12.277 0.833162C12.5375 0.739159 12.3675 0.41615 11.5259 0.42015C10.6844 0.42365 9.91439 0.705658 8.93286 1.08117C8.78935 1.13767 8.63835 1.17867 8.48384 1.21267C7.59332 1.04367 6.66829 1.00617 5.70226 1.11517C3.88321 1.31768 2.43016 2.1777 1.36213 3.64575C0.0790928 5.4103 -0.222916 7.41536 0.146595 9.50642C0.535106 11.7105 1.66014 13.535 3.38869 14.9616C5.18125 16.4406 7.24581 17.1657 9.60138 17.0266C11.0319 16.9441 12.6245 16.7526 14.421 15.2321C14.874 15.4576 15.3496 15.5476 16.1381 15.6151C16.7456 15.6716 17.3306 15.5851 17.7836 15.4911C18.4931 15.3411 18.4441 14.6841 18.1876 14.5636C16.1081 13.595 16.5646 13.9891 16.1496 13.67C17.2061 12.42 18.8202 10.1979 19.3182 7.17235C19.3672 6.83834 19.4297 6.36783 19.4222 6.09732C19.4182 5.93231 19.4562 5.86831 19.6447 5.84931C20.1657 5.78931 20.6712 5.64681 21.1357 5.3913C22.4833 4.65528 23.0268 3.44624 23.1548 1.9972C23.1738 1.77569 23.1508 1.54668 22.9168 1.43018ZM11.1749 14.4736C9.15936 12.889 8.18184 12.3675 7.77832 12.39C7.40081 12.4125 7.46881 12.8445 7.55182 13.126C7.63882 13.404 7.75182 13.5955 7.91033 13.8396C8.01983 14.0011 8.09533 14.2411 7.80083 14.4216C7.15181 14.8231 6.02327 14.2866 5.97027 14.2601C4.65673 13.4865 3.5587 12.4655 2.78467 11.069C2.03715 9.72493 1.60314 8.28289 1.53164 6.74384C1.51264 6.37233 1.62214 6.24082 1.99215 6.17332C2.47916 6.08332 2.98118 6.06432 3.46769 6.13582C5.52476 6.43633 7.27581 7.35586 8.74385 8.8129C9.58188 9.64243 10.2159 10.634 10.8689 11.6025C11.5634 12.631 12.3105 13.611 13.262 14.4146C13.598 14.6961 13.866 14.9101 14.1225 15.0681C13.349 15.1546 12.058 15.1731 11.1749 14.4746L11.1749 14.4736ZM12.141 8.25988C12.141 8.09488 12.273 7.96338 12.439 7.96338C12.4765 7.96338 12.5105 7.97088 12.541 7.98188C12.5825 7.99688 12.6205 8.01938 12.6505 8.05338C12.7035 8.10588 12.7335 8.18088 12.7335 8.25988C12.7335 8.42489 12.6015 8.55639 12.4355 8.55639C12.2695 8.55639 12.141 8.42489 12.141 8.25988ZM15.1415 9.79893C14.949 9.87793 14.7565 9.94544 14.5715 9.95294C14.2845 9.96794 13.9715 9.85143 13.8015 9.70893C13.5375 9.48742 13.3485 9.36342 13.2695 8.97691C13.2355 8.8119 13.2545 8.55639 13.2845 8.40989C13.3525 8.09438 13.277 7.89187 13.0545 7.70787C12.8735 7.55786 12.643 7.51636 12.39 7.51636C12.2955 7.51636 12.209 7.47486 12.1445 7.44136C12.039 7.38886 11.9519 7.25735 12.035 7.09585C12.0615 7.04335 12.19 6.91584 12.22 6.89334C12.5635 6.69784 12.9595 6.76184 13.326 6.90834C13.6655 7.04735 13.9225 7.30236 14.292 7.66287C14.6695 8.09838 14.7375 8.21838 14.9525 8.54539C15.1225 8.8009 15.277 9.06341 15.3831 9.36392C15.4471 9.55142 15.3641 9.70493 15.1415 9.79893Z";

		//#endregion
		//#region src/client/whale-art.ts
function svgDataUri(svg) {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
function officialWhale(paint) {
    return `<path d="${OFFICIAL_WHALE_PATH}" fill="${paint}"/>`;
}
function officialWhaleGroup(paint, scale, cx, cy) {
    const x = cx - 23.16 * scale / 2;
    const y = cy - 17.04 * scale / 2;
    return `<g transform="translate(${x} ${y}) scale(${scale})">${officialWhale(paint)}</g>`;
}
const LIGHT_BACKDROP = svgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f2f6ff"/>
      <stop offset="0.55" stop-color="#e3ecff"/>
      <stop offset="1" stop-color="#d6e4ff"/>
    </linearGradient>
    <linearGradient id="whale" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#6e8bff"/>
      <stop offset="1" stop-color="#2e4de6"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.42" r="0.5">
      <stop offset="0" stop-color="#4d6bfe" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#4d6bfe" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1440" height="900" fill="url(#sky)"/>
  <rect width="1440" height="900" fill="url(#glow)"/>
  <g fill="#4d6bfe" opacity="0.5">
    <circle cx="180" cy="180" r="3"/><circle cx="260" cy="120" r="2"/>
    <circle cx="1180" cy="200" r="4"/><circle cx="1280" cy="140" r="2.5"/>
    <circle cx="200" cy="620" r="2"/><circle cx="1220" cy="560" r="3"/>
  </g>
</svg>
`);
const DARK_BACKDROP = svgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#070d24"/>
      <stop offset="0.55" stop-color="#0b1437"/>
      <stop offset="1" stop-color="#101d4d"/>
    </linearGradient>
    <linearGradient id="whale" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#8fa6ff"/>
      <stop offset="1" stop-color="#3b5bff"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.42" r="0.55">
      <stop offset="0" stop-color="#4d6bfe" stop-opacity="0.34"/>
      <stop offset="1" stop-color="#4d6bfe" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1440" height="900" fill="url(#sky)"/>
  <rect width="1440" height="900" fill="url(#glow)"/>
  <g fill="#ffffff" opacity="0.55">
    <circle cx="120" cy="120" r="2"/><circle cx="320" cy="80" r="1.5"/>
    <circle cx="520" cy="200" r="2.5"/><circle cx="900" cy="110" r="2"/>
    <circle cx="1100" cy="240" r="1.5"/><circle cx="1330" cy="90" r="2.5"/>
    <circle cx="150" cy="420" r="1.5"/><circle cx="1310" cy="380" r="2"/>
  </g>
</svg>
`);
const WHALE_MASCOT = svgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.16 17.04">
  <defs>
    <linearGradient id="m" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#6e8bff"/>
      <stop offset="1" stop-color="#2e4de6"/>
    </linearGradient>
  </defs>
  ${officialWhale('url(#m)')}
</svg>
`);
const WHALE_FAVICON = svgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.16 17.04">
  <rect x="-2.4" y="-3.2" width="28" height="23.4" rx="4.5" fill="#0b1437"/>
  <defs>
    <linearGradient id="f" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#a8baff"/>
      <stop offset="1" stop-color="#6e8bff"/>
    </linearGradient>
  </defs>
  ${officialWhale('url(#f)')}
</svg>
`);
const TITLEBAR_BRAND = svgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 44">
  <defs>
    <linearGradient id="t" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#a8baff"/>
      <stop offset="1" stop-color="#6e8bff"/>
    </linearGradient>
  </defs>
  <g transform="translate(6 8) scale(1.5)">${officialWhale('url(#t)')}</g>
  <text x="46" y="33" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif"
        font-size="24" font-weight="700" letter-spacing="0.5" fill="#e7ecf7">DeepSeek Harness</text>
</svg>
`);
const WHALE_LOCKUP_GLYPH = svgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 24">
  <defs>
    <linearGradient id="l" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#8fa6ff"/>
      <stop offset="1" stop-color="#4d6bfe"/>
    </linearGradient>
    <clipPath id="wm-whale-clip"><rect width="23.16" height="17.0435" transform="translate(0.141602 3.52185)"/></clipPath>
  </defs>
  <g clip-path="url(#wm-whale-clip)"><path d="${OFFICIAL_WORDMARK_WHALE}" fill="url(#l)"/></g>
  ${OFFICIAL_WORDMARK_LETTERS.map((d)=>`<path d="${d}" fill="url(#l)"/>`).join('')}
</svg>
`);

		//#endregion
		//#region src/client/deepseek-whale.module.css
const css = "/* DeepSeek Leviathan: a DeepSeek-brand presentation layer over the stock web\n   GUI. The whale backdrop is applied separately by client/index.ts; this file\n   owns the design tokens, the glass chrome, and the sidebar composition. */\n\nbody[data-dsh-deepseek-whale] {\n  color: #10162b;\n  background-color: #eef3ff;\n  --ds-brand: #4d6bfe;\n  --ds-brand-strong: #2e4de6;\n  --ds-brand-soft: #8fa6ff;\n  --ds-navy-950: #070d24;\n  --ds-navy-900: #0b1437;\n  --ds-navy-800: #16205c;\n  --ds-navy-700: #243273;\n  --ds-ink: #10162b;\n  --ds-glass: rgba(255, 255, 255, 0.72);\n  --ds-shadow: 0 18px 54px rgba(46, 77, 230, 0.16), 0 2px 8px rgba(46, 77, 230, 0.1);\n\n  --dsw-alias-bg-base: transparent;\n  --dsw-alias-bg-layer-1: rgba(255, 255, 255, 0.74);\n  --dsw-alias-bg-layer-2: rgba(244, 248, 255, 0.86);\n  --dsw-alias-bg-layer-3: rgba(233, 240, 255, 0.9);\n  --dsw-alias-bg-overlay: rgba(255, 255, 255, 0.96);\n  --dsw-alias-border-l1: rgba(77, 107, 254, 0.16);\n  --dsw-alias-border-l2-darkmode-thin: rgba(77, 107, 254, 0.22);\n  --dsw-alias-border-l2: rgba(77, 107, 254, 0.28);\n  --dsw-alias-border-l3: rgba(46, 77, 230, 0.5);\n  --dsw-alias-brand-primary: #4d6bfe;\n  --dsw-alias-brand-text: #10162b;\n  --dsw-alias-button-elevated-fill: rgba(255, 255, 255, 0.9);\n  --dsw-alias-button-floating-fill: rgba(255, 255, 255, 0.95);\n  --dsw-alias-button-floating-hover: #e8eeff;\n  --dsw-alias-button-info-fill: #4d6bfe;\n  --dsw-alias-button-info-hover: #3b5bff;\n  --dsw-alias-interactive-bg-active: rgba(77, 107, 254, 0.2);\n  --dsw-alias-interactive-bg-hover: rgba(77, 107, 254, 0.1);\n  --dsw-alias-interactive-bg-hover-solid: #e8eeff;\n  --dsw-alias-label-primary: #10162b;\n  --dsw-alias-label-primary-bluish: #1c2f8a;\n  --dsw-alias-label-secondary: #45507e;\n  --dsw-alias-label-tertiary: #6b76a3;\n  --dsw-alias-label-caption: #8a94b8;\n  --dsw-alias-state-business-primary: #4d6bfe;\n  --dsw-alias-state-business-tertiary: #e2e9ff;\n  --dsw-shadow-lv2: var(--ds-shadow);\n  --dsw-specific-input-major: rgba(255, 255, 255, 0.85);\n  --dsw-specific-selector: rgba(233, 240, 255, 0.9);\n  /* The sidebar shares the conversation-pane surface: no fill of its own. */\n  --dsw-specific-sidebar-fill: transparent;\n}\n\nbody[data-dsh-deepseek-whale][data-ds-dark-theme] {\n  color: #e7ecf7;\n  background-color: #070d24;\n  --ds-glass: rgba(16, 26, 66, 0.74);\n  --ds-shadow: 0 18px 58px rgba(0, 0, 0, 0.38), 0 2px 10px rgba(0, 0, 0, 0.3);\n  --dsw-alias-bg-base: transparent;\n  --dsw-alias-bg-layer-1: rgba(19, 32, 84, 0.88);\n  --dsw-alias-bg-layer-2: rgba(24, 40, 96, 0.9);\n  --dsw-alias-bg-layer-3: rgba(30, 48, 110, 0.93);\n  --dsw-alias-bg-overlay: rgba(11, 20, 55, 0.97);\n  --dsw-alias-border-l1: rgba(143, 166, 255, 0.2);\n  --dsw-alias-border-l2-darkmode-thin: rgba(143, 166, 255, 0.3);\n  --dsw-alias-border-l2: rgba(143, 166, 255, 0.34);\n  --dsw-alias-border-l3: rgba(143, 166, 255, 0.6);\n  --dsw-alias-brand-primary: #8fa6ff;\n  --dsw-alias-brand-text: #e7ecf7;\n  --dsw-alias-button-elevated-fill: rgba(24, 40, 96, 0.94);\n  --dsw-alias-button-floating-fill: rgba(26, 43, 102, 0.96);\n  --dsw-alias-button-floating-hover: #2c3f96;\n  --dsw-alias-button-info-fill: #4d6bfe;\n  --dsw-alias-button-info-hover: #3b5bff;\n  --dsw-alias-interactive-bg-active: rgba(143, 166, 255, 0.24);\n  --dsw-alias-interactive-bg-hover: rgba(143, 166, 255, 0.12);\n  --dsw-alias-interactive-bg-hover-solid: #22317a;\n  --dsw-alias-label-primary: #e7ecf7;\n  --dsw-alias-label-primary-bluish: #d5dff3;\n  --dsw-alias-label-secondary: #bcc8e6;\n  --dsw-alias-label-tertiary: #93a1cc;\n  --dsw-alias-label-caption: #7c8ab8;\n  --dsw-alias-state-business-primary: #8fa6ff;\n  --dsw-alias-state-business-tertiary: #243273;\n  --dsw-specific-input-major: rgba(22, 36, 92, 0.86);\n  --dsw-specific-selector: rgba(28, 46, 108, 0.9);\n  /* The sidebar shares the conversation-pane surface in dark mode too. */\n  --dsw-specific-sidebar-fill: transparent;\n}\n\n/* ---- Backdrop ---- */\n\nbody[data-dsh-deepseek-whale]::before {\n  content: '';\n  position: fixed;\n  inset: 0;\n  z-index: -1;\n  background: var(--ds-whale-backdrop-art) center / cover no-repeat;\n  pointer-events: none;\n}\n\n/* ---- Sidebar: shares the conversation pane surface exactly ---- */\n\n/* The sidebar gets NO skin-owned background: it stays transparent so both\n   columns render over the same backdrop, exactly like the right pane. Only a\n   hairline divider and the native brand recolor remain. */\nbody[data-dsh-deepseek-whale] :is([data-pane='sidebar'], [class*='sidebarCol']) {\n  background: transparent;\n  border-right: 1px solid rgba(77, 107, 254, 0.14);\n}\n\nbody[data-dsh-deepseek-whale] :is([data-pane='sidebar'], [class*='sidebarCol']) > div {\n  position: relative;\n}\n\n/* Selected session: a light brand-blue plaque (readable on either theme). */\nbody[data-dsh-deepseek-whale] :is([data-pane='sidebar'], [class*='sidebarCol'])\n  [role='treeitem'][aria-selected='true'] {\n  background: linear-gradient(90deg, rgba(77, 107, 254, 0.22), rgba(77, 107, 254, 0.08));\n  color: inherit;\n  border-radius: 8px;\n}\n\nbody[data-dsh-deepseek-whale] :is([data-pane='sidebar'], [class*='sidebarCol'])\n  [role='treeitem'][aria-selected='true'] [class*='title'] {\n  color: inherit;\n}\n\n/* Native brand kept; recolor its glyph toward the brand blue. */\nbody[data-dsh-deepseek-whale] :is([data-pane='sidebar'], [class*='sidebarCol'])\n  button[class*='brand'] {\n  color: #4d6bfe;\n}\n\n/* Dark theme: the column stays transparent too — same surface as the pane. */\nbody[data-dsh-deepseek-whale][data-ds-dark-theme]\n  :is([data-pane='sidebar'], [class*='sidebarCol']) {\n  background: transparent;\n  border-right: 1px solid rgba(143, 166, 255, 0.16);\n}\n\nbody[data-dsh-deepseek-whale][data-ds-dark-theme]\n  :is([data-pane='sidebar'], [class*='sidebarCol'])\n  [role='treeitem'][aria-selected='true'] {\n  background: linear-gradient(90deg, rgba(77, 107, 254, 0.34), rgba(77, 107, 254, 0.12));\n  color: inherit;\n}\n\nbody[data-dsh-deepseek-whale][data-ds-dark-theme]\n  :is([data-pane='sidebar'], [class*='sidebarCol'])\n  [role='treeitem'][aria-selected='true'] [class*='title'] {\n  color: inherit;\n}\n\nbody[data-dsh-deepseek-whale][data-ds-dark-theme]\n  :is([data-pane='sidebar'], [class*='sidebarCol'])\n  button[class*='brand'] {\n  color: #c7d2fe;\n}\n\n/* ---- Frameless title bar ---- */\n\nbody[data-dsh-deepseek-whale] [data-skin-chrome='titlebar-brand'] {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  pointer-events: none;\n}\n\nbody[data-dsh-deepseek-whale] [data-skin-chrome='titlebar-brand'] img {\n  height: 22px;\n  width: auto;\n}\n\nbody[data-dsh-deepseek-whale] [class*='titlebar'] {\n  background: linear-gradient(to top, var(--ds-navy-900), var(--ds-navy-700));\n}\n\nbody[data-dsh-deepseek-whale] [class*='titlebar'] [class*='button'] {\n  color: #c7d2fe;\n}\n\n/* ---- Composer: DeepSeek-blue glass card ---- */\n\nbody[data-dsh-deepseek-whale] [data-composer-card] {\n  background: var(--ds-glass);\n  border: 1px solid rgba(77, 107, 254, 0.26);\n  border-radius: 16px;\n  box-shadow: var(--ds-shadow);\n  backdrop-filter: blur(6px) saturate(1.05);\n}\n\nbody[data-dsh-deepseek-whale] [data-composer-card] textarea:focus {\n  outline: 2px solid rgba(77, 107, 254, 0.55);\n  outline-offset: 2px;\n}\n\n/* Send / primary action in the brand blue. */\nbody[data-dsh-deepseek-whale] [data-composer-card] button[class*='primary'],\nbody[data-dsh-deepseek-whale] [data-composer-card] button[aria-haspopup='dialog'][class*='trigger'] {\n  color: #4d6bfe;\n}\n\nbody[data-dsh-deepseek-whale] [data-composer-card] button[class*='primary'] {\n  background: linear-gradient(145deg, #6e8bff, #2e4de6);\n  color: #ffffff;\n}\n\n/* ---- Terminal & code: cool navy surfaces ---- */\n\nbody[data-dsh-deepseek-whale] [data-terminal] {\n  --dsw-alias-markdown-code-block: rgba(248, 250, 255, 0.97);\n  --dsw-alias-label-primary: #10162b;\n  text-shadow: none;\n}\n\nbody[data-dsh-deepseek-whale][data-ds-dark-theme] [data-terminal] {\n  --dsw-alias-markdown-code-block: rgba(10, 18, 48, 0.97);\n  --dsw-alias-label-primary: #e7ecf7;\n}\n\n/* ---- Question / todo panels: paired readable surfaces ---- */\n\nbody[data-dsh-deepseek-whale] [data-question-key] {\n  --dsw-alias-label-primary: #10162b;\n}\n\nbody[data-dsh-deepseek-whale] [data-question-key] > section {\n  background: rgba(255, 255, 255, 0.97);\n}\n\nbody[data-dsh-deepseek-whale] [data-question-key] [aria-checked='true'] {\n  background: linear-gradient(90deg, rgba(77, 107, 254, 0.26), rgba(77, 107, 254, 0.1));\n}\n\nbody[data-dsh-deepseek-whale][data-ds-dark-theme] [data-question-key] {\n  --dsw-alias-label-primary: #edf1fa;\n}\n\nbody[data-dsh-deepseek-whale][data-ds-dark-theme] [data-question-key] > section {\n  background: rgba(19, 32, 84, 0.98);\n}\n\nbody[data-dsh-deepseek-whale][data-ds-dark-theme] [data-question-key] [aria-checked='true'] {\n  background: linear-gradient(90deg, rgba(77, 107, 254, 0.4), rgba(77, 107, 254, 0.18));\n}\n\nbody[data-dsh-deepseek-whale] [data-testid='todo-panel'] {\n  --dsw-alias-label-primary: #10162b;\n}\n\nbody[data-dsh-deepseek-whale][data-ds-dark-theme] [data-testid='todo-panel'] {\n  --dsw-alias-label-primary: #e7ecf7;\n}\n\n/* ---- Settings dialog: translucent glass over the dimmed composer ---- */\n\nbody[data-dsh-deepseek-whale] [data-slot='sidebar.settings'] [role='presentation']\n  > [role='dialog'][aria-modal='true'] {\n  --dsw-alias-bg-layer-2: rgba(244, 248, 255, 0.7);\n  backdrop-filter: blur(6px) saturate(0.95);\n}\n\nbody[data-dsh-deepseek-whale][data-ds-dark-theme] [data-slot='sidebar.settings'] [role='presentation']\n  > [role='dialog'][aria-modal='true'] {\n  --dsw-alias-bg-layer-2: rgba(24, 40, 96, 0.84);\n}\n\n/* ---- Assistant markdown bubbles: soft porcelain with a blue corner ---- */\n\nbody[data-dsh-deepseek-whale] [data-chat-flow-kind='assistant-step'] > * > * > *\n  div[class*='markdown'] {\n  max-width: min(680px, 96%);\n  padding: 14px 18px;\n  border-radius: 16px 16px 16px 6px;\n  background: rgba(255, 255, 255, 0.66);\n}\n\nbody[data-dsh-deepseek-whale][data-ds-dark-theme] [data-chat-flow-kind='assistant-step'] > * > * > *\n  div[class*='markdown'] {\n  background: rgba(19, 32, 84, 0.72);\n}\n\n/* ---- Hero headline on the light whale sky ---- */\n\nbody[data-dsh-deepseek-whale] [data-phase='hero'] [class*='headlineText'] {\n  color: #10162b;\n  text-shadow: 0 2px 6px rgba(255, 255, 255, 0.6);\n}\n\nbody[data-dsh-deepseek-whale][data-ds-dark-theme] [data-phase='hero'] [class*='headlineText'] {\n  color: #f4f7ff;\n  text-shadow: 0 3px 8px rgba(0, 0, 0, 0.5);\n}\n\n/* ---- Centered brand lockup: official whale + DeepSeek wordmark ---- */\n\n/* Seat the lockup at the middle of the conversation pane (right of the\n   sidebar). The pane center shifts with the sidebar, so the offset rides the\n   same --maid-sidebar-width custom property the backdrop uses. It is a pure\n   backdrop layer: z-index -1 (same floor as the backdrop art), pointer-events\n   none and no hover styling — it never covers messages or steals clicks. */\nbody[data-dsh-deepseek-whale] [data-skin-chrome='brand-lockup'] {\n  position: fixed;\n  left: calc(50% + (var(--maid-sidebar-width, 280px) / 2));\n  top: 42%;\n  transform: translate(-50%, -50%);\n  z-index: -1;\n  pointer-events: none;\n  opacity: 0.9;\n  filter: drop-shadow(0 0 22px rgba(77, 107, 254, 0.45))\n          drop-shadow(0 0 60px rgba(77, 107, 254, 0.28))\n          drop-shadow(0 14px 34px rgba(46, 77, 230, 0.3));\n}\n\n/* Large: matches the original backdrop whale footprint (~600px wide). */\nbody[data-dsh-deepseek-whale] [data-skin-chrome='brand-lockup'] [data-brand-glyph] {\n  display: block;\n  width: clamp(430px, 42vw, 620px);\n  height: auto;\n}\n\nbody[data-dsh-deepseek-whale][data-ds-dark-theme] [data-skin-chrome='brand-lockup'] {\n  filter: drop-shadow(0 0 26px rgba(143, 166, 255, 0.5))\n          drop-shadow(0 0 70px rgba(143, 166, 255, 0.3))\n          drop-shadow(0 14px 34px rgba(0, 0, 0, 0.45));\n}\n\n/* ============================================================\n   Detail layer: DeepSeek-blue glow, glass, and motion accents\n   (mirrors the maid-atelier ornament stack, re-inked in brand blue)\n   ============================================================ */\n\n/* 1. Top edge glow strip: a 2px brand-blue light band across the viewport. */\nbody[data-dsh-deepseek-whale]::after {\n  content: '';\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 2px;\n  z-index: 30;\n  background: linear-gradient(90deg, transparent, rgba(77, 107, 254, 0.9) 18%, #4d6bfe 50%, rgba(77, 107, 254, 0.9) 82%, transparent);\n  box-shadow: 0 0 12px rgba(77, 107, 254, 0.55), 0 0 32px rgba(77, 107, 254, 0.3);\n  pointer-events: none;\n}\n\nbody[data-dsh-deepseek-whale][data-ds-dark-theme]::after {\n  background: linear-gradient(90deg, transparent, rgba(143, 166, 255, 0.85) 18%, #8fa6ff 50%, rgba(143, 166, 255, 0.85) 82%, transparent);\n  box-shadow: 0 0 14px rgba(143, 166, 255, 0.6), 0 0 40px rgba(143, 166, 255, 0.35);\n}\n\n/* 2. Composer: pale-blue glass border that blooms on focus. */\nbody[data-dsh-deepseek-whale] [data-composer-card] {\n  border: 1px solid rgba(77, 107, 254, 0.35);\n  box-shadow: var(--ds-shadow), 0 0 0 1px rgba(77, 107, 254, 0.08), 0 0 18px rgba(77, 107, 254, 0.1);\n  transition: border-color 260ms ease, box-shadow 260ms ease;\n}\n\nbody[data-dsh-deepseek-whale] [data-composer-card]:focus-within {\n  border-color: rgba(77, 107, 254, 0.65);\n  box-shadow: var(--ds-shadow), 0 0 0 1px rgba(77, 107, 254, 0.2), 0 0 26px rgba(77, 107, 254, 0.28);\n}\n\nbody[data-dsh-deepseek-whale][data-ds-dark-theme] [data-composer-card] {\n  border-color: rgba(143, 166, 255, 0.4);\n  box-shadow: var(--ds-shadow), 0 0 0 1px rgba(143, 166, 255, 0.1), 0 0 18px rgba(143, 166, 255, 0.12);\n}\n\nbody[data-dsh-deepseek-whale][data-ds-dark-theme] [data-composer-card]:focus-within {\n  border-color: rgba(143, 166, 255, 0.7);\n  box-shadow: var(--ds-shadow), 0 0 0 1px rgba(143, 166, 255, 0.22), 0 0 28px rgba(143, 166, 255, 0.3);\n}\n\n/* 3. Selected session: a brand-blue left-edge indicator bar instead of a\n      full-row plaque (the maid session plaque, re-inked). */\nbody[data-dsh-deepseek-whale] :is([data-pane='sidebar'], [class*='sidebarCol'])\n  [role='treeitem'][aria-selected='true'] {\n  position: relative;\n  background: linear-gradient(90deg, rgba(77, 107, 254, 0.16), rgba(77, 107, 254, 0.05));\n  color: inherit;\n  border-radius: 6px;\n}\n\nbody[data-dsh-deepseek-whale] :is([data-pane='sidebar'], [class*='sidebarCol'])\n  [role='treeitem'][aria-selected='true']::before {\n  content: '';\n  position: absolute;\n  left: 0;\n  top: 20%;\n  bottom: 20%;\n  width: 3px;\n  border-radius: 2px;\n  background: linear-gradient(180deg, #4d6bfe, #8fa6ff);\n  box-shadow: 0 0 8px rgba(77, 107, 254, 0.6);\n}\n\nbody[data-dsh-deepseek-whale][data-ds-dark-theme] :is([data-pane='sidebar'], [class*='sidebarCol'])\n  [role='treeitem'][aria-selected='true']::before {\n  background: linear-gradient(180deg, #8fa6ff, #4d6bfe);\n  box-shadow: 0 0 8px rgba(143, 166, 255, 0.6);\n}\n\n/* 4. Message bubbles: user = brand-blue gradient; assistant = porcelain glass\n      with a blue left edge (dark theme gets the deep-sea versions). */\nbody[data-dsh-deepseek-whale] [data-chat-flow-kind='user'] > * > * > *\n  div[class*='markdown'] {\n  max-width: min(680px, 96%);\n  padding: 14px 18px;\n  border-radius: 18px 18px 7px 18px;\n  background: linear-gradient(145deg, #6e8bff, #2e4de6);\n  color: #ffffff;\n  box-shadow: 0 4px 16px rgba(46, 77, 230, 0.28), 0 0 12px rgba(77, 107, 254, 0.16);\n}\n\nbody[data-dsh-deepseek-whale] [data-chat-flow-kind='assistant-step'] > * > * > *\n  div[class*='markdown'] {\n  max-width: min(680px, 96%);\n  padding: 14px 18px;\n  border-radius: 18px 18px 18px 7px;\n  border: 1px solid rgba(77, 107, 254, 0.24);\n  background: rgba(255, 255, 255, 0.82);\n  box-shadow: 0 4px 14px rgba(46, 77, 230, 0.1), inset 3px 0 0 rgba(77, 107, 254, 0.35);\n}\n\nbody[data-dsh-deepseek-whale][data-ds-dark-theme] [data-chat-flow-kind='user'] > * > * > *\n  div[class*='markdown'] {\n  background: linear-gradient(145deg, #3b5bff, #2439c9);\n  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.35), 0 0 14px rgba(77, 107, 254, 0.3);\n}\n\nbody[data-dsh-deepseek-whale][data-ds-dark-theme] [data-chat-flow-kind='assistant-step'] > * > * > *\n  div[class*='markdown'] {\n  border-color: rgba(143, 166, 255, 0.3);\n  background: rgba(19, 32, 84, 0.78);\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25), inset 3px 0 0 rgba(143, 166, 255, 0.4);\n}\n\n/* 5. Primary actions (send / new session): brand-blue gradient + hover glow. */\nbody[data-dsh-deepseek-whale] [data-composer-card] button[class*='primary'] {\n  background: linear-gradient(145deg, #6e8bff, #2e4de6);\n  color: #ffffff;\n  border: none;\n  box-shadow: 0 2px 10px rgba(46, 77, 230, 0.35);\n  transition: box-shadow 220ms ease, transform 220ms ease, filter 220ms ease;\n}\n\nbody[data-dsh-deepseek-whale] [data-composer-card] button[class*='primary']:hover:not(:disabled) {\n  box-shadow: 0 2px 14px rgba(46, 77, 230, 0.55), 0 0 18px rgba(77, 107, 254, 0.4);\n  filter: brightness(1.08);\n  transform: translateY(-1px);\n}\n\nbody[data-dsh-deepseek-whale] button[class*='newSession'] {\n  background: linear-gradient(145deg, #6e8bff, #2e4de6);\n  color: #ffffff;\n  border: none;\n  box-shadow: 0 2px 10px rgba(46, 77, 230, 0.3);\n  transition: box-shadow 220ms ease, transform 220ms ease, filter 220ms ease;\n}\n\nbody[data-dsh-deepseek-whale] button[class*='newSession']:hover {\n  box-shadow: 0 2px 14px rgba(46, 77, 230, 0.5), 0 0 16px rgba(77, 107, 254, 0.35);\n  filter: brightness(1.08);\n  transform: translateY(-1px);\n}\n\nbody[data-dsh-deepseek-whale] [data-composer-card] button[class*='primary'] svg,\nbody[data-dsh-deepseek-whale] button[class*='newSession'] svg {\n  color: #ffffff;\n}\n\n/* 6. Scrollbars: slim translucent brand-blue thumbs. */\nbody[data-dsh-deepseek-whale] ::-webkit-scrollbar {\n  width: 8px;\n  height: 8px;\n}\n\nbody[data-dsh-deepseek-whale] ::-webkit-scrollbar-track {\n  background: transparent;\n}\n\nbody[data-dsh-deepseek-whale] ::-webkit-scrollbar-thumb {\n  background: rgba(77, 107, 254, 0.35);\n  border-radius: 4px;\n  border: 2px solid transparent;\n  background-clip: content-box;\n}\n\nbody[data-dsh-deepseek-whale] ::-webkit-scrollbar-thumb:hover {\n  background: rgba(77, 107, 254, 0.55);\n  background-clip: content-box;\n  border: 2px solid transparent;\n}\n\nbody[data-dsh-deepseek-whale][data-ds-dark-theme] ::-webkit-scrollbar-thumb {\n  background: rgba(143, 166, 255, 0.4);\n  border: 2px solid transparent;\n  background-clip: content-box;\n}\n\n/* 8. Hero headline: a slim gradient rule under the landing title. */\nbody[data-dsh-deepseek-whale] [data-phase='hero'] [class*='headline']::after {\n  content: '';\n  display: block;\n  width: min(240px, 70%);\n  height: 2px;\n  margin: 10px auto 0;\n  border-radius: 1px;\n  background: linear-gradient(90deg, transparent, rgba(77, 107, 254, 0.8), transparent);\n}\n\nbody[data-dsh-deepseek-whale][data-ds-dark-theme] [data-phase='hero'] [class*='headline']::after {\n  background: linear-gradient(90deg, transparent, rgba(143, 166, 255, 0.8), transparent);\n}\n\n/* 9. Particle waterline at the viewport floor: blue light motes stream\n      continuously from the left edge to the right, each on its own delay,\n      speed, height, and size (seeded by client/index.ts). */\nbody[data-dsh-deepseek-whale] [data-skin-chrome='bottom-waves'] {\n  position: fixed;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  height: 56px;\n  z-index: 1;\n  overflow: hidden;\n  pointer-events: none;\n  opacity: 0.9;\n}\n\nbody[data-dsh-deepseek-whale] [data-skin-chrome='bottom-waves'] [data-skin-particle] {\n  position: absolute;\n  top: var(--ds-mote-top, 20px);\n  left: -12px;\n  width: var(--ds-mote-size, 3px);\n  height: var(--ds-mote-size, 3px);\n  border-radius: 50%;\n  background: radial-gradient(circle, rgba(143, 166, 255, 0.95), rgba(77, 107, 254, 0.35) 60%, transparent 100%);\n  box-shadow: 0 0 6px rgba(77, 107, 254, 0.8), 0 0 12px rgba(77, 107, 254, 0.4);\n  opacity: var(--ds-mote-opacity, 0.6);\n  animation: ds-mote-stream var(--ds-mote-duration, 7s) linear infinite;\n  animation-delay: var(--ds-mote-delay, 0s);\n}\n\n@keyframes ds-mote-stream {\n  from { transform: translateX(0); }\n  to { transform: translateX(calc(100vw + 24px)); }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  body[data-dsh-deepseek-whale] [data-skin-chrome='bottom-waves'] {\n    display: none;\n  }\n}\n";
const tagId = "@dsh-external/dsh-client-ui-skin-deepseek-whale/deepseek-whale.module.css";
if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
	const tag = document.createElement("style");
	tag.dataset.plugin = "@dsh-external/dsh-client-ui-skin-deepseek-whale";
	tag.dataset.pluginCss = tagId;
	tag.textContent = css;
	document.head.appendChild(tag);
}
		//#endregion
		//#region src/client/index.ts
/* css injected below */
const SKIN_TITLE = 'DeepSeek 蓝鲸 · DeepSeek Harness';
const SKIN_OWNER = 'deepseek-whale';
const SKIN_SYSTEM_CHROME_COLOR = '#0b1437';
const SIDEBAR_COLUMN_SELECTOR = ":is([data-pane='sidebar'], [class*='sidebarCol'])";
const BACKDROP_PROPERTIES = [
    'background-image',
    'background-position',
    'background-size',
    'background-attachment',
    'background-repeat',
    '--ds-whale-favicon-art',
    '--ds-whale-backdrop-art'
];
function decorateTitlebarBrand(ownedNodes) {
    const titlebar = document.querySelector("[class*='titlebar']");
    if (!titlebar) return;
    if (titlebar.querySelector("[data-skin-chrome='titlebar-brand']")) return;
    const brand = document.createElement('span');
    brand.dataset.skinChrome = 'titlebar-brand';
    brand.dataset.skinOwner = SKIN_OWNER;
    brand.setAttribute('aria-hidden', 'true');
    const img = document.createElement('img');
    img.alt = '';
    img.src = TITLEBAR_BRAND;
    brand.append(img);
    ownedNodes.add(brand);
    titlebar.prepend(brand);
}
function decorateSidebar() {}
function createBrandLockup() {
    const lockup = document.createElement('div');
    lockup.dataset.skinChrome = 'brand-lockup';
    lockup.dataset.skinOwner = SKIN_OWNER;
    lockup.setAttribute('aria-hidden', 'true');
    const glyph = document.createElement('img');
    glyph.dataset.brandGlyph = 'lockup';
    glyph.alt = '';
    glyph.src = WHALE_LOCKUP_GLYPH;
    lockup.append(glyph);
    return lockup;
}
function createBottomWaves() {
    const waves = document.createElement('div');
    waves.dataset.skinChrome = 'bottom-waves';
    waves.dataset.skinOwner = SKIN_OWNER;
    waves.setAttribute('aria-hidden', 'true');
    const seeded = (index)=>{
        const x = Math.sin(index * 127.1 + 311.7) * 43758.5453;
        return x - Math.floor(x);
    };
    const COUNT = 18;
    for(let i = 0; i < COUNT; i++){
        const mote = document.createElement('span');
        mote.dataset.skinParticle = '';
        const size = 2 + seeded(i) * 3.5;
        const duration = 5.5 + seeded(i + 7) * 7;
        const delay = -seeded(i + 13) * duration;
        const top = 2 + seeded(i + 3) * 40;
        const opacity = 0.25 + seeded(i + 17) * 0.55;
        mote.style.setProperty('--ds-mote-size', `${size.toFixed(2)}px`);
        mote.style.setProperty('--ds-mote-duration', `${duration.toFixed(2)}s`);
        mote.style.setProperty('--ds-mote-delay', `${delay.toFixed(2)}s`);
        mote.style.setProperty('--ds-mote-top', `${top.toFixed(1)}px`);
        mote.style.setProperty('--ds-mote-opacity', opacity.toFixed(2));
        waves.append(mote);
    }
    return waves;
}
function apply(ctx) {
    const body = document.body;
    const originalTitle = document.title;
    const previous = new Map();
    for (const property of BACKDROP_PROPERTIES){
        previous.set(property, body.style.getPropertyValue(property));
    }
    const ownedNodes = new Set();
    let themeColorMeta = null;
    let previousThemeColor;
    let themeColorObserver;
    let observer;
    let syncBackdrop;
    ctx.effect(()=>()=>{
            delete body.dataset.dshDeepseekWhale;
            observer?.disconnect();
            themeColorObserver?.disconnect();
            for (const [property, value] of previous){
                body.style.setProperty(property, value);
            }
            ownedNodes.forEach((element)=>element.remove());
            if (themeColorMeta?.isConnected && themeColorMeta.content === SKIN_SYSTEM_CHROME_COLOR) {
                themeColorMeta.content = previousThemeColor ?? '';
            }
            if (document.title === SKIN_TITLE) document.title = originalTitle;
        }, 'ui-skin-deepseek-whale: whale backdrop and glass chrome');
    const syncSystemChrome = ()=>{
        const meta = document.head.querySelector('meta[name="theme-color"]');
        if (meta === null) return;
        if (meta !== themeColorMeta) {
            themeColorMeta = meta;
            previousThemeColor = meta.content;
        }
        if (meta.content !== SKIN_SYSTEM_CHROME_COLOR) meta.content = SKIN_SYSTEM_CHROME_COLOR;
    };
    themeColorObserver = new MutationObserver(syncSystemChrome);
    themeColorObserver.observe(document.head, {
        attributes: true,
        attributeFilter: [
            'content'
        ],
        childList: true,
        subtree: true
    });
    syncSystemChrome();
    body.dataset.dshDeepseekWhale = '';
    body.style.setProperty('--ds-whale-favicon-art', `url(${WHALE_FAVICON})`);
    syncBackdrop = ()=>{
        const source = body.hasAttribute('data-ds-dark-theme') ? DARK_BACKDROP : LIGHT_BACKDROP;
        body.style.setProperty('background-image', `url(${source})`);
        body.style.setProperty('--ds-whale-backdrop-art', `url(${source})`);
    };
    syncBackdrop();
    body.style.setProperty('background-position', 'center');
    body.style.setProperty('background-size', 'cover');
    body.style.setProperty('background-attachment', 'fixed');
    body.style.setProperty('background-repeat', 'no-repeat');
    decorateTitlebarBrand(ownedNodes);
    decorateSidebar();
    let brandLockup;
    const ensureBrandLockup = ()=>{
        if (brandLockup !== undefined) return;
        brandLockup = createBrandLockup();
        ownedNodes.add(brandLockup);
        body.append(brandLockup);
    };
    const syncBrandLockup = ()=>{
        ensureBrandLockup();
    };
    ensureBrandLockup();
    const bottomWaves = createBottomWaves();
    ownedNodes.add(bottomWaves);
    body.append(bottomWaves);
    const syncDecorations = ()=>{
        decorateTitlebarBrand(ownedNodes);
        decorateSidebar();
    };
    const isSkinChrome = (node)=>node instanceof Element && node.getAttribute('data-skin-owner') === SKIN_OWNER;
    const nodeTouches = (node, selector)=>node instanceof Element && (node.matches(selector) || node.querySelector(selector) !== null);
    const sidebarChromeSelector = `${SIDEBAR_COLUMN_SELECTOR}, [class*='titlebar']`;
    observer = new MutationObserver((records)=>{
        let sidebarStructureChanged = false;
        let backdropChanged = false;
        let phaseChanged = false;
        for (const record of records){
            if (record.type === 'attributes') {
                if (record.attributeName === 'data-ds-dark-theme' && record.target === body) {
                    backdropChanged = true;
                } else if (record.attributeName === 'data-phase' && record.target instanceof Element) {
                    phaseChanged = true;
                }
                continue;
            }
            const appNodes = [
                ...record.addedNodes,
                ...record.removedNodes
            ].filter((node)=>node instanceof Element && !isSkinChrome(node));
            const target = record.target instanceof Element ? record.target : undefined;
            if (appNodes.length > 0 && (appNodes.some((node)=>nodeTouches(node, sidebarChromeSelector)) || target !== undefined && target.closest(SIDEBAR_COLUMN_SELECTOR) !== null)) {
                sidebarStructureChanged = true;
            }
            if (appNodes.length > 0 && appNodes.some((node)=>nodeTouches(node, "[data-phase='hero'], [data-phase='active']"))) {
                phaseChanged = true;
            }
        }
        if (sidebarStructureChanged) syncDecorations();
        if (backdropChanged) syncBackdrop?.();
        if (phaseChanged) syncBrandLockup();
    });
    observer.observe(body, {
        attributes: true,
        attributeFilter: [
            'data-ds-dark-theme',
            'data-phase'
        ],
        childList: true,
        subtree: true
    });
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/svg+xml';
    favicon.href = WHALE_FAVICON;
    favicon.dataset.skinChrome = 'favicon';
    favicon.dataset.skinOwner = SKIN_OWNER;
    ownedNodes.add(favicon);
    document.head.append(favicon);
    document.title = SKIN_TITLE;
}

		//#endregion
		exports.apply = apply;
		return module.exports;
	}
});
