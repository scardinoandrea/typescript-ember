import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

const EMOJI_MAP = {
  '128077': '👍', // Thumbs up
  '128525': '😍', // Heart eyes
  '128293': '🔥', // Fire
  '128514': '😂', // Laughing
};

// Option 1: Using type guards
/* type Comment = { author: string; comment: string };
type Emoji = string;
type ReactionDetail = Comment | Emoji;
type Reaction = { type: string; detail: ReactionDetail }; */

// Option 2: Using discriminating unions
type ReactionAsComment = {
  detail: {
    author: string;
    comment: string;
  };
  type: 'Comment';
};
type ReactionAsEmoji = {
  detail: string;
  type: 'Emoji';
};
type Reaction = ReactionAsComment | ReactionAsEmoji;

export default class PostDisplayComponent extends Component {
  @tracked newCommentAuthor = '';
  @tracked newCommentBody = '';
  @tracked showCommentForm = false;

  @tracked reactions: Reaction[] = [
    {
      type: 'Comment',
      detail: { author: 'Alice', comment: 'Great post! Thanks for sharing.' },
    },
    { type: 'Emoji', detail: EMOJI_MAP['128077'] }, // Thumbs up emoji (👍)
    {
      type: 'Comment',
      detail: { author: 'Bob', comment: 'Very informative.' },
    },
    { type: 'Emoji', detail: EMOJI_MAP['128525'] }, // Heart eyes emoji (😍)
    {
      type: 'Comment',
      detail: { author: 'Charlie', comment: 'Looking forward to more!' },
    },
    { type: 'Emoji', detail: EMOJI_MAP['128293'] }, // Fire emoji (🔥)
  ];

  // Option 1: Helper functions (type guards)
  /*   isEmojiReaction = (
    reaction: Reaction,
  ): reaction is Reaction & { detail: Emoji } => {
    return reaction.type === 'Emoji';
  };

  isCommentReaction = (
    reaction: Reaction,
  ): reaction is Reaction & { detail: Comment } => {
    return reaction.type === 'Comment';
  }; */

  @action
  updateNewCommentAuthor(event: Event) {
    this.newCommentAuthor = (event.target as HTMLInputElement).value;
  }

  @action
  updateNewCommentBody(event: Event) {
    this.newCommentBody = (event.target as HTMLTextAreaElement).value;
  }

  @action
  toggleCommentForm() {
    this.showCommentForm = !this.showCommentForm;
    if (!this.showCommentForm) {
      this.newCommentAuthor = '';
      this.newCommentBody = '';
    }
  }

  @action
  addComment() {
    if (this.newCommentAuthor && this.newCommentBody) {
      this.reactions = [
        ...this.reactions,
        {
          type: 'Comment',
          detail: {
            author: this.newCommentAuthor,
            comment: this.newCommentBody,
          },
        },
      ];
      this.newCommentAuthor = '';
      this.newCommentBody = '';
      this.showCommentForm = false;
    }
  }

  @action
  addEmojiReaction(emojiCode: keyof typeof EMOJI_MAP) {
    this.reactions = [
      ...this.reactions,
      { type: 'Emoji', detail: EMOJI_MAP[emojiCode] },
    ];
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    PostDisplay: typeof PostDisplayComponent;
  }
}
