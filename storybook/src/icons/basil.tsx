// Basil by Craftwork. CC BY 4.0. See public/basil-attribution.txt.
import {forwardRef,type SVGProps} from 'react';
import paths from './paths.json';
export type IconProps=SVGProps<SVGSVGElement>&{size?:number|string;absoluteStrokeWidth?:boolean};
export type LucideIcon=ReturnType<typeof icon>;
function icon(name:keyof typeof paths,rotation=0){return forwardRef<SVGSVGElement,IconProps>(({size=24,strokeWidth:_s,absoluteStrokeWidth:_a,...props},ref)=><svg ref={ref} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden={props['aria-label']?undefined:true} {...props} data-icon={'basil:'+name}><g transform={rotation?'rotate('+rotation+' 12 12)':undefined} dangerouslySetInnerHTML={{__html:paths[name]}}/></svg>);}
export const basilNames=Object.keys(paths) as (keyof typeof paths)[];
export function BasilIcon({name,...props}:IconProps&{name:keyof typeof paths}){const Glyph=icon(name);return <Glyph {...props}/>;}
export const AlertOctagon=icon('info-triangle-outline',0);
export const AlertTriangle=icon('info-triangle-outline',0);
export const ArrowUpRight=icon('arrow-right-outline',-45);
export const Bot=icon('comment-outline',0);
export const Building2=icon('bank-outline',0);
export const Calendar=icon('calendar-outline',0);
export const Check=icon('check-outline',0);
export const CheckCircle2=icon('checked-box-outline',0);
export const ChevronDown=icon('caret-down-outline',0);
export const ChevronRight=icon('caret-right-outline',0);
export const ChevronUp=icon('caret-up-outline',0);
export const Clock=icon('clock-outline',0);
export const CreditCard=icon('card-outline',0);
export const Ellipsis=icon('other-1-outline',0);
export const FileText=icon('document-outline',0);
export const Gauge=icon('dialpad-outline',0);
export const Info=icon('info-circle-outline',0);
export const List=icon('rows-outline',0);
export const Package=icon('box-outline',0);
export const Phone=icon('phone-outline',0);
export const Plus=icon('plus-outline',0);
export const Receipt=icon('invoice-outline',0);
export const Search=icon('search-outline',0);
export const Settings=icon('settings-outline',0);
export const ShoppingCart=icon('shopping-cart-outline',0);
export const Sparkles=icon('lightbulb-outline',0);
export const Tag=icon('bookmark-outline',0);
export const TriangleAlert=icon('info-triangle-outline',0);
export const Truck=icon('box-outline',0);
export const Undo2=icon('reply-outline',0);
export const UtensilsCrossed=icon('book-open-outline',0);
export const Wrench=icon('settings-adjust-outline',0);
export const X=icon('cross-outline',0);

// Typographic minus and CSS status dot: primitives, not alternate icon artwork.
export const Minus=forwardRef<SVGSVGElement,IconProps>(({size=16,...props},ref)=><svg ref={ref} width={size} height={size} viewBox="0 0 24 24" aria-hidden={true} {...props}><text x="12" y="18" textAnchor="middle" fill="currentColor" fontSize="24">−</text></svg>);
export const Circle=forwardRef<SVGSVGElement,IconProps>(({size=16,...props},ref)=><svg ref={ref} width={size} height={size} viewBox="0 0 24 24" aria-hidden={true} {...props}><circle cx="12" cy="12" r="6" fill="currentColor"/></svg>);
