import { Pipe, PipeTransform } from '@angular/core';
import { QuestionFromServer } from '../models/QuestionFromServer';

import * as Fuse from 'fuse.js';
import { SimpleTag } from '../models/SimpleTag';

@Pipe({
    name: 'searchfilter'
})
export class SearchFilterPipe implements PipeTransform {
    transform(value: Array<QuestionFromServer>, searchStr: string, searchStack: string, searchTags: Array<SimpleTag>): Array<QuestionFromServer> {
        if (!value || (!searchStr && !searchStack)) { return value; }
        var options = { keys: ['questionText', 'questionTitle'] };

        //filter by stack if selected
        if (searchStack != null && searchStack != "") {
            console.log(searchStack);
            value = value.filter(q => q.stack == searchStack);
            //and return results if no search criteria
            if (searchStr == "") {
                return value;
            }
        }
        
        //**** !!!!!!!!!!!!! FILTER IS NOT BEING TRIGGERED ON CHANGES TO SEARCHTAGS *****/
        //filter for questions that have any of the selected tags
        // let tagsToInclude = this.getSelectedTags(searchTags);
        // console.log(searchTags);
        // console.log(tagsToInclude);
        // if (tagsToInclude.length > 0) {
        //     value = value.filter(q => q.containsAnyTags(tagsToInclude));
        // }

        //run fuse with searchStr
        var fuse = new Fuse(value, options);
        return fuse.search(searchStr);

        // var filteredQuestions;
        //filtering for questions only with ALL specified tags
        // if (searchTags.length > 0) {
        //     filteredQuestions = value.filter(question => {
        //         let tagValues = this.getFields(question.tags);
        //         for (let stag of searchTags) {
        //             if (tagValues.indexOf(stag) < 0) {
        //                 return false;
        //             }
        //         }
        //         return true;
        //     });
        // }

        // filtering for questions with ANY of the specified tags
        // if (searchTags.length > 0) {
        //     filteredQuestions = value.filter(question => {
        //         let tagValues = this.getFields(question.tagsString);
        //         console.log(tagValues);
        //         for (let stag of tagValues) {
        //             console.log(searchTags.indexOf(stag));
        //             // console.log(`question: ${question.questionText}, ${tagValues.indexOf(stag)}`);
        //             if (searchTags.indexOf(stag) >= 0) {
        //                 return true;
        //             }
        //         }
        //         return false;
        //     });
        // }
        // else {
        //     filteredQuestions = value;
        // }

        // let filteredQuestions = fuse.search(searchStr);
        // return filteredQuestions;
    }

    private getSelectedTags(input: SimpleTag[]) {
        let selectedTags = [];
        for (let t of input) {
            if (t.selected) {
                selectedTags.push(t.tagName);
            }
        }
        return selectedTags;
    }
}