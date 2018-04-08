import { reduceRange } from '../price'
import { toNumber } from '../validator'
import { parseInstance } from '../service'
import { MONTHLY_HOURS } from '../constants'

export default (row, priceList) => {
  const unit = toNumber(row.unit)
  const storage = toNumber(row.storage)
  const transfer = toNumber(row.transfer)

  let total = 0

  if (row.instance && unit) {
    const instance = parseInstance(row.instance, priceList.ec2.instance)

    total += instance.price * unit * MONTHLY_HOURS
  }

  if (storage) {
    total += priceList.ebs.gp2.price * storage * (unit ? unit : 1)
  }

  if (transfer) {
    total += reduceRange(transfer, priceList.transfer.out.priceRange)
  }

  return total
}
