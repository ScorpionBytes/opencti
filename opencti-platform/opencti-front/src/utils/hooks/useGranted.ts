import { filter, includes } from 'ramda';
import useAuth from './useAuth';

export const OPENCTI_ADMIN_UUID = '88ec0c6a-13ce-5e39-b486-354fe4a7084f';
export const BYPASS = 'BYPASS';
export const KNOWLEDGE = 'KNOWLEDGE';
export const BYPASSREFERENCE = 'BYPASSREFERENCE';
export const KNOWLEDGE_KNUPDATE = 'KNOWLEDGE_KNUPDATE';
export const KNOWLEDGE_KNPARTICIPATE = 'KNOWLEDGE_KNPARTICIPATE';
export const KNOWLEDGE_KNUPDATE_KNDELETE = 'KNOWLEDGE_KNUPDATE_KNDELETE';
export const KNOWLEDGE_KNUPDATE_KNORGARESTRICT = 'KNOWLEDGE_KNUPDATE_KNORGARESTRICT';
export const KNOWLEDGE_KNUPDATE_KNMANAGEAUTHMEMBERS = 'KNOWLEDGE_KNUPDATE_KNMANAGEAUTHMEMBERS';
export const KNOWLEDGE_KNUPLOAD = 'KNOWLEDGE_KNUPLOAD';
export const KNOWLEDGE_KNASKIMPORT = 'KNOWLEDGE_KNASKIMPORT';
export const KNOWLEDGE_KNGETEXPORT = 'KNOWLEDGE_KNGETEXPORT';
export const KNOWLEDGE_KNGETEXPORT_KNASKEXPORT = 'KNOWLEDGE_KNGETEXPORT_KNASKEXPORT';
export const KNOWLEDGE_KNENRICHMENT = 'KNOWLEDGE_KNENRICHMENT';
export const EXPLORE = 'EXPLORE';
export const EXPLORE_EXUPDATE = 'EXPLORE_EXUPDATE';
export const EXPLORE_EXUPDATE_EXDELETE = 'EXPLORE_EXUPDATE_EXDELETE';
export const EXPLORE_EXUPDATE_PUBLISH = 'EXPLORE_EXUPDATE_PUBLISH';
export const MODULES = 'MODULES';
export const MODULES_MODMANAGE = 'MODULES_MODMANAGE';
export const SETTINGS = 'SETTINGS';
export const VIRTUAL_ORGANIZATION_ADMIN = 'VIRTUAL_ORGANIZATION_ADMIN';
export const TAXIIAPI_SETCOLLECTIONS = 'TAXIIAPI_SETCOLLECTIONS';
export const TAXIIAPI_SETCSVMAPPERS = 'TAXIIAPI_SETCSVMAPPERS';
export const SETTINGS_SETACCESSES = 'SETTINGS_SETACCESSES';
export const SETTINGS_SETMARKINGS = 'SETTINGS_SETMARKINGS';
export const SETTINGS_SETLABELS = 'SETTINGS_SETLABELS';
export const SETTINGS_SECURITYACTIVITY = 'SETTINGS_SECURITYACTIVITY';

export const isOnlyOrganizationAdmin = () => {
  const { me: user } = useAuth();
  const userCapabilities = user.capabilities.map((n) => n.name);
  return userCapabilities.includes(VIRTUAL_ORGANIZATION_ADMIN) && !userCapabilities.includes(BYPASS) && !userCapabilities.includes(SETTINGS);
};

const useGranted = (capabilities: string[], matchAll = false): boolean => {
  const { me } = useAuth();

  const userCapabilities = (me.capabilities ?? []).map((c) => c.name);
  if (userCapabilities.includes(BYPASS)) {
    return true;
  }
  let numberOfAvailableCapabilities = 0;
  for (let index = 0; index < capabilities.length; index += 1) {
    const checkCapability = capabilities[index];
    const matchingCapabilities = filter(
      (r) => includes(checkCapability, r),
      userCapabilities,
    );
    if (matchingCapabilities.length > 0) {
      numberOfAvailableCapabilities += 1;
    }
  }
  if (matchAll) {
    return numberOfAvailableCapabilities === capabilities.length;
  }
  return numberOfAvailableCapabilities > 0;
};

export default useGranted;
