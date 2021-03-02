<template functional>
  <component
    :is="$options.getComponent(props.icon)"
    :class="[
      data.class,
      data.staticClass,
      { 'base-icon--custom': $options.isCustomIcon(props.icon) },
    ]"
    :icon="$options.getIcon(props.icon)"
    class="base-icon"
    v-bind="$options.getAttributes({ data, parent })"
    v-on="listeners"
  />
</template>

<script>
import camelCase from 'lodash/camelCase';
import snakeCase from 'lodash/snakeCase';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faAnalytics as analyticsSolid,
  faBallotCheck as ballotCheckSolid,
  faClipboardCheck as clipboardCheckSolid,
  faCreditCard as creditCardSolid,
  faEar as ear,
  faTachometer as tachometerSolid,
  faUser as userSolid,
  faArrowLeft as arrowLeft,
  faArrowRight as arrowRight,
  faBan as ban,
  faBell as bell,
  faBriefcase as briefcaseSolid,
  faBuilding as building,
  faCabinetFiling as cabinetFilingSolid,
  faCalendar as calendar,
  faCheck as check,
  faCheckCircle as checkCircleSolid,
  faClock as clock,
  faCloudUploadAlt as upload,
  faCogs as cogsSolid,
  faComment as commentSolid,
  faExclamation as alert,
  faExclamationCircle as alertCircle,
  faExclamationTriangle as alertTriangle,
  faGift as giftSolid,
  faHandshakeAlt as handShakeSolid,
  faIdCardAlt as idCardSolid,
  faLightbulb as lightbulbSolid,
  faLock as lock,
  faMoneyBillWave as moneySolid,
  faPen as pen,
  faPhoneAlt as phone,
  faPrint as print,
  faQuestion as question,
  faQuestionCircle as questionCircle,
  faQuestionSquare as questionSquareSolid,
  faSignOutAlt as signOutSolid,
  faUmbrella as umbrellaSolid,
  faTimesHexagon as closeHexagonSolid,
  faUsers as usersSolid,
  faUsersClass as usersClassSolid,
  faTrash as trash,
  faVirus as virusSolid,
  faWrench as wrench,
} from '@fortawesome/pro-solid-svg-icons';

import {
  faCheckCircle as checkCircle,
  faFolder as folder,
  faSearch as search,
} from '@fortawesome/pro-regular-svg-icons';

import {
  faAnalytics as analytics,
  faBallotCheck as ballotCheck,
  faCabinetFiling as cabinetFiling,
  faChevronLeft as chevronLeft,
  faChevronRight as chevronRight,
  faCircle as circle,
  faClipboardCheck as clipboardCheck,
  faCogs as cogs,
  faComment as comment,
  faCreditCard as creditCard,
  faEllipsisV as ellipsisV,
  faGift as gift,
  faLightbulb as lightbulb,
  faPlus as plus,
  faSignOutAlt as signOut,
  faTimes as close,
  faTimesCircle as closeCircle,
  faTachometer as tachometer,
  faUmbrella as umbrella,
  faUsersClass as usersClass,
  faUser as user,
  faUsers as users,
  faVirus as virus,
} from '@fortawesome/pro-light-svg-icons';

import caretDown from '../../assets/icons/caret-down.svg';
import eyeClosed from '../../assets/icons/eye-closed.svg';
import eyeOpen from '../../assets/icons/eye-open.svg';

import getAttributes from '../../util/getAttributes';

const FAIcons = Object.freeze({
  alert,
  alertCircle,
  alertTriangle,
  analytics,
  analyticsSolid,
  arrowLeft,
  arrowRight,
  ballotCheck,
  ballotCheckSolid,
  ban,
  bell,
  briefcaseSolid,
  building,
  cabinetFiling,
  cabinetFilingSolid,
  calendar,
  check,
  checkCircle,
  checkCircleSolid,
  chevronLeft,
  chevronRight,
  circle,
  clipboardCheck,
  clipboardCheckSolid,
  clock,
  close,
  closeCircle,
  closeHexagonSolid,
  cogs,
  cogsSolid,
  comment,
  commentSolid,
  creditCard,
  creditCardSolid,
  ear,
  ellipsisV,
  folder,
  gift,
  giftSolid,
  handShakeSolid,
  idCardSolid,
  lightbulb,
  lightbulbSolid,
  lock,
  moneySolid,
  pen,
  phone,
  plus,
  print,
  question,
  questionCircle,
  questionSquareSolid,
  search,
  signOut,
  signOutSolid,
  tachometer,
  tachometerSolid,
  trash,
  umbrella,
  umbrellaSolid,
  upload,
  user,
  userSolid,
  users,
  usersClass,
  usersClassSolid,
  usersSolid,
  virus,
  virusSolid,
  wrench,
});

Object.values(FAIcons).forEach((icon) => {
  library.add(icon);
});

const CustomIcons = Object.freeze({
  caretDown,
  eyeClosed,
  eyeOpen,
});

export const Icons = Object.freeze(
  [...Object.keys(FAIcons), ...Object.keys(CustomIcons)].sort().reduce(
    (obj, val) => ({
      ...obj,
      [snakeCase(val).toUpperCase()]: val,
    }),
    {}
  )
);

export const isValidIcon = (value) =>
  Object.values(Icons).includes(camelCase(value));

const isCustomIcon = (iconName) => Object.keys(CustomIcons).includes(iconName);

const getComponent = (iconName) =>
  isCustomIcon(iconName) ? CustomIcons[iconName] : FontAwesomeIcon;

/**
 * `import { BaseIcon } from '@bambee/pollen';`
 *
 * An SVG icon component pulling from Bambee's predefined icon set. Icons are
 * designed to be styled according to the contextual size and font color, e.g.
 * if you want a red, 40px icon, make sure it or its containing element is
 * styled with `color: red; font-size: 40px;`.
 */
export default {
  props: {
    /** The name of the icon to use. */
    icon: {
      type: String,
      required: true,
      validator: isValidIcon,
    },
  },
  getAttributes,
  getComponent,
  getIcon: (icon) => FAIcons[camelCase(icon)] || null,
  isCustomIcon,
};
</script>

<style>
.base-icon--custom {
  height: 1em;
  width: 1em;
}
</style>
