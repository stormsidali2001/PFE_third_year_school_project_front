import { createTypedHooks} from 'easy-peasy';
import { Model } from './models';


const {useStoreState,useStoreActions,useStoreDispatch,useStore} = createTypedHooks<Model>();

export  {useStoreState,useStoreActions,useStoreDispatch,useStore};