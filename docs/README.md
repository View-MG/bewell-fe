page
- สำหรับเก็บสินค้าทั้งหมดโดย Fetch ข้อมูลมาจากไฟล์ bewellProduct.json มาแสดง 
- จะมี Map โดยมี Key เก็บ productId และ Value ในการเก็บสินค้า(ข้อมูลสินค้าทั้งหมด) และจำนวนสินค้านั้นๆ ชื่อ cardMap โดยหากมีการเพิ่มไอเทม (กดที่ icon cart) เข้าไป หากไม่มีจะ set Quantity ไว้ที่ 1 หากมีสินค้านั้นแล้วจะ +1 
และจะส่ง cartMap ไปที่ Component card Order.tsx
- มีช่องสำหรับ Search ไว้ Search ชื่อ

Order
- component สำหรับแสดงหน้าจอสรุปคำสั่งซื้อทั้งหมด ทั้งสินค้าที่สั่ง จำนวนสินค้าที่สั่ง และสรุปราคาที่ต้องจ่ายสินค้าทั้งหมด
- รับ cartMap จาก page.tsx เข้ามาแสดงใน component BuyingCard
- มี set ของ product โดยจะเก็บ Id ไว้ หากมีไอเทมในเซ็ท จะส่ง Status เข้าไปให้ Buying Card Cover (Status เป็นตัวบอกส่งภายหลัง)

Buying Card

Buying Card Cover

Card

Card Button
