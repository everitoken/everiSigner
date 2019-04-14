import { generateMnemonicWords, decrypt } from './PasswordService'

test('generateMnemonicWords', () => {
  const words = generateMnemonicWords('ooliufei', 'english')
  expect(words).not.toBe(
    'liberty coach humble excess sunny adult host visual hammer garbage clinic tonight able motion front vessel develop goat casual lizard differ exchange pottery dice'
  )
})

test('decrypt', () => {
  const data =
    '{"iv":"tFIvLQNrvvFqmcdVeB8S2Q==","salt":"u/mDZe32WNY=","ct":"35mALzO+kqTh45sj6YhjVXDG6dljZMO9w1hmmTTGM9xzdEvUEeBg4a26BvazjZKq8YlSA04bQ77PsX4="}'
  const password = 'ooliufei'
  expect(decrypt(password, data).data).toEqual(
    '5JbKK9dsTmCE1HSjAZRXthMZYRrjQa1bG8UJj9bVXP3pY8jQh7F'
  )
})
