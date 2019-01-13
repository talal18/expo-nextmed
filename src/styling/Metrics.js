import { Dimensions, Platform } from "react-native";
import NormalizeSize from "./NormalizeSize";

const { width, height } = Dimensions.get("window");

const metrics = {
  marginHorizontal: NormalizeSize.normalizeWidth(10),
  marginVertical: NormalizeSize.normalizeHeight(10),

  /*----------------- Login Page --------------------*/

  //Login page padding
  loginContainerPaddingTop: NormalizeSize.normalizeHeight(30),
  // Logo

  logoHeight: NormalizeSize.normalizeHeight(240),
  logoWidth: NormalizeSize.normalizeWidth(219),
  logoContainerH: NormalizeSize.normalizeHeight(260),
  logoContainerW: NormalizeSize.normalizeWidth(209),
  logoContainerPadding: NormalizeSize.normalizeWidth(10),
  //Home screen
  headerHeight: NormalizeSize.normalizeHeight(80),
  logoHeaderWidth: NormalizeSize.normalizeWidth(30),
  logoHeaderHeight: NormalizeSize.normalizeHeight(50),
  titleHeaderWidth: NormalizeSize.normalizeWidth(150),
  titleHeaderHeight: NormalizeSize.normalizeHeight(50),
  tabHeight: NormalizeSize.normalizeHeight(50),
  homeListItemContainerHeight: NormalizeSize.normalizeHeight(70),
  homeListItemWidth: NormalizeSize.normalizeWidth(350),
  homeListItemHeight: NormalizeSize.normalizeHeight(50),
  settingsTabLogoWidth: NormalizeSize.normalizeWidth(35),
  settingsTabLogoHeight: NormalizeSize.normalizeHeight(35),
  homeTabLogoWidth: NormalizeSize.normalizeWidth(35),
  homeTabLogoHeight: NormalizeSize.normalizeHeight(35),

  //Input
  inputBoxW: NormalizeSize.normalizeWidth(300),
  inputBoxH: NormalizeSize.normalizeHeight(50),
  //Login button
  loginButtonH: NormalizeSize.normalizeHeight(40),
  loginButtonW: NormalizeSize.normalizeWidth(120),
  signinImageW: NormalizeSize.normalizeWidth(90),
  signinImageH: NormalizeSize.normalizeHeight(30),
  //Divider
  dividerSocialMediaW: NormalizeSize.normalizeWidth(300),
  //Socail media
  facebookLogoWH: NormalizeSize.normalizeWidth(60),
  googleLogoWH: NormalizeSize.normalizeWidth(60),
  socailMediaImageWH: NormalizeSize.normalizeWidth(55),
  //Signup text
  signupText: NormalizeSize.normalizeWidth(300),

  /*----------------- Form Page --------------------*/

  //Form page padding
  formContainerPaddingTop: NormalizeSize.normalizeHeight(30),
  //Form container
  formContainerPaddingLeft: NormalizeSize.normalizeWidth(15),
  formContainerPaddingRight: NormalizeSize.normalizeWidth(15),
  //form contents divider
  formContentDivider: NormalizeSize.normalizeWidth(350),
  //Title input box
  formTitleinputBoxW: NormalizeSize.normalizeWidth(350),
  formTitleinputBoxH: NormalizeSize.normalizeHeight(50),
  //Type drop menu container
  fromTypeDropMenucontainerW: NormalizeSize.normalizeWidth(350),
  fromTypeDropMenucontainerH: NormalizeSize.normalizeHeight(50),

  //Type drop menu
  formTypeDropMenuW: NormalizeSize.normalizeWidth(350),
  formTypeDropMenuH: NormalizeSize.normalizeHeight(30),
  formTypeDropMenuArrowW: NormalizeSize.normalizeWidth(15),
  formTypeDropMenuArrowH: NormalizeSize.normalizeHeight(15),

  //Add times list
  formAddTimeListContainerHeight: NormalizeSize.normalizeHeight(60),
  formAddTimeListContainerWidth: NormalizeSize.normalizeWidth(350),
  formAddTimeButtonWidth: NormalizeSize.normalizeWidth(350),
  formAddTimeButtonHeight: NormalizeSize.normalizeHeight(50),
  formAddTimeListHeight: NormalizeSize.normalizeHeight(60),
  formAddTimeListWidth: NormalizeSize.normalizeWidth(320),

  //Set Start and End Date
  formSetDateContainerWidth: NormalizeSize.normalizeWidth(330),
  formSetDateContainerHeight: NormalizeSize.normalizeHeight(120),
  formStartDateContainerWidth: NormalizeSize.normalizeWidth(320),
  formStartDateContainerHeight: NormalizeSize.normalizeHeight(60),
  formEndDateContainerWidth: NormalizeSize.normalizeWidth(320),
  formEndDateContainerHeight: NormalizeSize.normalizeHeight(60),
  formSetAddButtonHeight: NormalizeSize.normalizeHeight(50),
  formSetAddButtonWidth: NormalizeSize.normalizeWidth(50),

  //Save button
  formSaveButtonWidth: NormalizeSize.normalizeWidth(350),
  formSaveButtonHeight: NormalizeSize.normalizeHeight(50),

  //text area
  textAreaContainerHeight: NormalizeSize.normalizeHeight(100),
  textAreaContainerWidth: NormalizeSize.normalizeWidth(350),
  textAreaHeight: NormalizeSize.normalizeHeight(100),
  textAreaWidth: NormalizeSize.normalizeWidth(340)
};

export default metrics;
