import { AccountModel } from '../../../../domain/models/account'
import { Collection } from 'mongodb'

export const map = async (collection: Collection, result: any) => {
  const { insertedId: id } = result
  const accountById = await collection.findOne({ _id: id })
  const { _id, ...accountWithoutId } = accountById
  const account = Object.assign({}, accountWithoutId, {
    id: _id.toHexString()
  }) as AccountModel

  return account
}
