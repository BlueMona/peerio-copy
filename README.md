# peerio-copy
Master repository for English copy, synchronized with Transifex. 

If you would like to contribute translations, please do so on our [Transifex portal](https://www.transifex.com/projects/p/peerio/), NOT here. 

If you're here because you're adding new strings to a Peerio client, you probably want to check out the [__`icebear`__](https://github.com/PeerioTechnologies/peerio-copy/tree/icebear) branch and update `icebear_en.json`.

### exclusions-masterlist
The list of words to be removed from Peerio's passphrase dictionaries. The list is multi-lingual and suggestions to add or remove words in any language are welcome. 

**Guidelines for contributing**

This list has been compiled through a number of publicly available lists, as well as independent contributions. It has not been reviewed item-by-item, and there may be terms that should be added or removed.

There are a few general categories of words included in this list:

1. Obscenities, expletives, and crass language
2. Sexually explicit material
3. Offensive slurs and discriminatory language 
3. Demographic terms, such as nationality, ethnicity, sexuality, or religion

Categories (1-3) include words that may offend independent of the context in which they appear. For example `poop` has been included in the English passphrase dictionary, but `poopchute` is excluded.

Category (4), demographics, is included to avoid *potentially* offensive content. For example, `dirty <nationality>` or `disgusting <religion>`.

Adjectives and other descriptive terms that may have offensive connotations depending on context are *not* excluded. For example, `disgusting puppies` is not likely to offend. The inclusion of category (4) helps ensure Peerio's passphrase dictionary is able to use a wider set of adjectives and other descriptive terms, which tend to offer greater usability compared to nouns and objects. This is because descriptors can generally be stacked, whereas objects cannot. For example, it is easier to imagine `fast lovable disgusting puppies` than it is `dune coffee puppies movie`.

If you have thoughts or suggestions on how to improve this list or Peerio's passphrases, please message us on Peerio at `peerio`, or email us at peerio@peerio.com.
