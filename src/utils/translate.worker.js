import { pipeline } from '@xenova/transformers';

class MyTranslationPipeline {
  static task = 'translation';
  static model = 'Xenova/nllb-200-distilled-600M';
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      this.instance = pipeline(this.task, this.model, { progress_callback });
    }

    return this.instance;
  }
}

self.addEventListener('message', async (event) => {
    let translator = await MyTranslationPipeline.getInstance((x) => {
        self.postMessage(x)
    })
    console.log(event.data)
    let output = await translator(event.data.text, {
        tgt_lang: event.data.tgt_language,
        src_lang: event.data.src_lang,

        callback_function: x => {

          const decodeOutputs = x.map(outputItem => {
            return translator.tokenizer.decode(outputItem.output_token_ids, { skip_special_tokens: true })  
          })

            self.postMessage({
                status: 'update',
                output: decodeOutputs
            })
        }
    })

    console.log('Final Translation', output)

    self.postMessage({
        status: 'complete',
        output: output,
    })
})