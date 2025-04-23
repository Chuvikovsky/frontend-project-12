import { useTranslation } from 'react-i18next';

const PageNotFound = () => {
  const { t } = useTranslation();
  return <h3>{t('pageNotFound')}</h3>;
};

export default PageNotFound;
