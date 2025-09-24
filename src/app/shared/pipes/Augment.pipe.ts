import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'Augment',
  standalone: true,
})
export class AugmentPipe implements PipeTransform {
  transform(
    text: string,
    dataValues: Record<string, number> = {},
    rich = false,
    localization: Record<string, string> = {}
  ): string {
    if (!text) return '';

    let parsed = text;

    parsed = parsed.replace(/@([\w*]+)@/g, (_, key) => {
      if (key.includes('*')) {
        const [valKey, multiplier] = key.split('*');
        const value = dataValues[valKey];
        if (value !== undefined) {
          return (value * parseFloat(multiplier)).toFixed(2);
        }
      }
      if (dataValues[key] !== undefined) {
        return dataValues[key].toString();
      }
      return `?${key}?`;
    });

    parsed = parsed.replace(/\?([\w\d]+)\?/g, (_, key) => {
      if (dataValues[key] !== undefined) {
        return dataValues[key].toString();
      }
      return `?${key}?`;
    });

    parsed = parsed.replace(/%i:([\w]+)%/g, (_, key) => {
      return rich
        ? `<span class="icon icon-${key}"></span>`
        : `[${key}]`;
    });

    parsed = parsed.replace(/\{\{([\w\d_]+)\}\}/g, (_, key) => {
      return localization[key] ?? `{{${key}}}`;
    });

    if (rich) {
      parsed = parsed
        .replace(/<spellName>(.*?)<\/spellName>/g, `<span class="spell">$1</span>`)
        .replace(/<trueDamage>(.*?)<\/trueDamage>/g, `<span class="true-damage">$1</span>`)
        .replace(/<status>(.*?)<\/status>/g, `<span class="status">$1</span>`)
        .replace(/<keywordStealth>(.*?)<\/keywordStealth>/g, `<span class="stealth">$1</span>`)
        .replace(/<healing>(.*?)<\/healing>/g, `<span class="healing">$1</span>`)
        .replace(/<speed>(.*?)<\/speed>/g, `<span class="speed">$1</span>`)
        .replace(/<attackSpeed>(.*?)<\/attackSpeed>/g, `<span class="attack-speed">$1</span>`);
    } else {
      parsed = parsed
        .replace(/<.*?>(.*?)<\/.*?>/g, '$1')
        .replace(/<.*?>/g, '');
    }

    parsed = parsed.replace(/<br\s*\/?>/g, '\n');

    return parsed.trim();
  }
}
