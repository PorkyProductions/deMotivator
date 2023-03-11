<script>
    import { tweets } from './tweets'

</script>
<a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-text={tweets[Math.floor(Math.random() * tweets.length)]} data-hashtags="ouch" data-show-count="false">Share on Twitter</a>