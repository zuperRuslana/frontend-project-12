import filter from 'leo-profanity';

filter.add(filter.getDictionary('en'));
filter.add(filter.getDictionary('ru'));

export default function (text ){
    return filter.clean(`${text}`,{replaceKey: '*'})

}