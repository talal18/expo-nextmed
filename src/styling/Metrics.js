import { Dimensions, Platform } from "react-native";
import NormalizeSize from "./NormalizeSize";

const { width, height } = Dimensions.get("window");

const metrics = {
  marginHorizontal: NormalizeSize.normalizeWidth(10),
  marginVertical: NormalizeSize.normalizeHeight(10),

  fullScreenWidth: NormalizeSize.normalizeWidth(width),
  fullScreenHeight: NormalizeSize.normalizeHeight(height),

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
  tabHeight: NormalizeSize.normalizeHeight(60),
  homeListItemContainerHeight: NormalizeSize.normalizeHeight(70),
  homeListItemWidth: NormalizeSize.normalizeWidth(350),
  homeListItemHeight: NormalizeSize.normalizeHeight(50),
  settingsTabLogoWidth: NormalizeSize.normalizeWidth(35),
  settingsTabLogoHeight: NormalizeSize.normalizeHeight(35),
  homeTabLogoWidth: NormalizeSize.normalizeWidth(35),
  homeTabLogoHeight: NormalizeSize.normalizeHeight(35),
  homeMedImageWidth: NormalizeSize.normalizeWidth(50),
  homeMedImageHeight: NormalizeSize.normalizeHeight(50),
  homeDeleteButtonWidth: NormalizeSize.normalizeWidth(50),
  homeDeleteButtonHeight: NormalizeSize.normalizeHeight(50),
  homeAddButtonWidth: 35,
  homeAddButtonHeight: 35,
  homeAddButtonMarginRight: NormalizeSize.normalizeWidth(10),

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

  //Form container
  formContainerPaddingLeft: NormalizeSize.normalizeWidth(15),
  formContainerPaddingRight: NormalizeSize.normalizeWidth(15),
  //ScrollView
  scrollViewContainerPaddingHorizontal: NormalizeSize.normalizeWidth(25),
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

  //Type images container
  imageTextViewContainerW: NormalizeSize.normalizeWidth(100),
  imageTextViewContainerH: NormalizeSize.normalizeHeight(150),
  typeImageW: NormalizeSize.normalizeWidth(70),
  typeImageH: NormalizeSize.normalizeHeight(70),
  typeImagesPaddingW: NormalizeSize.normalizeWidth(10),
  typeImagesPaddingH: NormalizeSize.normalizeHeight(10),

  //Add Image
  formAddImageButtonWidth: NormalizeSize.normalizeWidth(350),
  formAddImageButtonHeight: NormalizeSize.normalizeHeight(50),
  //Modal

  modalButtonWidth: NormalizeSize.normalizeWidth(350),
  modalButtonHeight: NormalizeSize.normalizeHeight(60),

  //Add times list
  formAddTimeListContainerHeight: NormalizeSize.normalizeHeight(60),
  formAddTimeListContainerWidth: NormalizeSize.normalizeWidth(350),
  formAddTimeButtonWidth: NormalizeSize.normalizeWidth(350),
  formAddTimeButtonHeight: NormalizeSize.normalizeHeight(50),
  formAddTimeListHeight: NormalizeSize.normalizeHeight(60),
  formAddTimeListWidth: NormalizeSize.normalizeWidth(320),
  formAddTimeDeleteButtonWidth: NormalizeSize.normalizeWidth(30),
  formAddTimeDeleteButtonHeight: NormalizeSize.normalizeHeight(30),
  formAddTimeDeleteButtonImageWidth: NormalizeSize.normalizeWidth(40),
  formAddTimeDeleteButtonImageHeight: NormalizeSize.normalizeHeight(40),

  //Reccurence
  medRecEachImageContainerW: NormalizeSize.normalizeWidth(90),
  medRecEachImageContainerH: NormalizeSize.normalizeHeight(150),
  medRecImageWidth: NormalizeSize.normalizeWidth(50),
  medRecImageHeight: NormalizeSize.normalizeHeight(50),

  //Set Start and End Date
  formSetDateContainerWidth: NormalizeSize.normalizeWidth(330),
  formSetDateContainerHeight: NormalizeSize.normalizeHeight(120),
  formStartDateContainerWidth: NormalizeSize.normalizeWidth(320),
  formStartDateContainerHeight: NormalizeSize.normalizeHeight(60),
  formEndDateContainerWidth: NormalizeSize.normalizeWidth(320),
  formEndDateContainerHeight: NormalizeSize.normalizeHeight(60),
  // formSetAddButtonHeight: NormalizeSize.normalizeHeight(50),
  // formSetAddButtonWidth: NormalizeSize.normalizeWidth(50),
  formSetAddDateButtonWidth: NormalizeSize.normalizeWidth(30),
  formSetAddDateButtonHeight: NormalizeSize.normalizeHeight(30),
  formSetAddDateButtonImageWidth: NormalizeSize.normalizeWidth(40),
  formSetAddDateButtonImageHeight: NormalizeSize.normalizeHeight(40),

  //Save button
  formSaveButtonWidth: NormalizeSize.normalizeWidth(350),
  formSaveButtonHeight: NormalizeSize.normalizeHeight(50),

  //text area
  textAreaContainerHeight: NormalizeSize.normalizeHeight(100),
  textAreaContainerWidth: NormalizeSize.normalizeWidth(350),

  //Manage Notifications FlatList search input box
  searchInputBoxW: NormalizeSize.normalizeWidth(350),
  searchInputBoxH: NormalizeSize.normalizeHeight(50),
  searchInputFontSize:
    Platform.OS === "ios"
      ? NormalizeSize.normalizeHeight(18)
      : NormalizeSize.normalizeWidth(18),

  // font
  titleFontSize:
    Platform.OS === "ios"
      ? NormalizeSize.normalizeHeight(23)
      : NormalizeSize.normalizeWidth(23),
  inputFontSize:
    Platform.OS === "ios"
      ? NormalizeSize.normalizeHeight(23)
      : NormalizeSize.normalizeWidth(23),
  dropDownFontSize:
    Platform.OS === "ios"
      ? NormalizeSize.normalizeHeight(23)
      : NormalizeSize.normalizeWidth(18),
  flatListItemFontSize:
    Platform.OS === "ios"
      ? NormalizeSize.normalizeHeight(26)
      : NormalizeSize.normalizeWidth(26),
  EmptyFlatListFontSize:
    Platform.OS === "ios"
      ? NormalizeSize.normalizeHeight(20)
      : NormalizeSize.normalizeWidth(20),
  navigationTitleFontSize: 18,
  ModalButtonsFontSize:
    Platform.OS === "ios"
      ? NormalizeSize.normalizeHeight(22)
      : NormalizeSize.normalizeWidth(22),
  TypeRecFontSize:
    Platform.OS === "ios"
      ? NormalizeSize.normalizeHeight(16)
      : NormalizeSize.normalizeWidth(16)
};

export default metrics;
