import Icon from './Icon';
import type { IconProps } from './Icon';

const IconArrowBack: React.FC<IconProps> = (props) => (
    <Icon {...props}>
        <path
            d="M10.4634 22.12L1.77004 13.4267C0.743378 12.4 0.743378 10.72 1.77004 9.69333L10.4634 1"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
        />
    </Icon>
);

export default IconArrowBack;
