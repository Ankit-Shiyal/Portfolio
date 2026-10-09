import feather from 'feather-icons';

export default function Icon({ name, className = '' }) {
  const icon = feather.icons[name];
  if (!icon) return null;

  const svg = className ? icon.toSvg({ class: className }) : icon.toSvg();

  return <span className="icon-wrap" dangerouslySetInnerHTML={{ __html: svg }} />;
}
