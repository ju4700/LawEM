import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '@/types/database';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: 'ব্যবহারকারীর নাম এবং পাসওয়ার্ড প্রয়োজনীয়' },
        { status: 400 }
      );
    }

    // Demo authentication - works without database
    if (username === 'admin' && password === '123456') {
      // Generate JWT token
      const token = jwt.sign(
        { 
          username: 'admin', 
          role: 'lawyer',
          fullName: 'আইনজীবী প্রশাসক' 
        },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      return NextResponse.json({
        message: 'সফলভাবে লগইন হয়েছে',
        token,
        user: {
          username: 'admin',
          fullName: 'আইনজীবী প্রশাসক',
          role: 'lawyer',
          email: 'admin@lawem.com',
        }
      });
    }

    // Try database authentication as fallback
    try {
      const { db } = await connectToDatabase();
      
      // Check if user exists in database
      const existingUser = await db.collection<User>('users').findOne({ username });
      
      if (!existingUser) {
        // Create default admin user for demo
        if (username === 'admin') {
          const hashedPassword = await bcrypt.hash('123456', 12);
          const newUser: Omit<User, '_id'> = {
            username: 'admin',
            email: 'admin@lawem.com',
            password_hash: hashedPassword,
            full_name: 'আইনজীবী প্রশাসক',
            role: 'lawyer',
            is_active: true,
            created_at: new Date(),
            updated_at: new Date(),
          };
          
          await db.collection('users').insertOne(newUser);
          
          // Generate JWT token
          const token = jwt.sign(
            { 
              username: newUser.username, 
              role: newUser.role,
              fullName: newUser.full_name 
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
          );

          // Update last login
          await db.collection('users').updateOne(
            { username },
            { $set: { last_login: new Date(), updated_at: new Date() } }
          );

          return NextResponse.json({
            message: 'সফলভাবে লগইন হয়েছে',
            token,
            user: {
              username: newUser.username,
              fullName: newUser.full_name,
              role: newUser.role,
              email: newUser.email,
            }
          });
        }
        
        return NextResponse.json(
          { message: 'ভুল ব্যবহারকারীর নাম বা পাসওয়ার্ড' },
          { status: 401 }
        );
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, existingUser.password_hash);
      
      if (!isPasswordValid) {
        return NextResponse.json(
          { message: 'ভুল ব্যবহারকারীর নাম বা পাসওয়ার্ড' },
          { status: 401 }
        );
      }

      // Check if user is active
      if (!existingUser.is_active) {
        return NextResponse.json(
          { message: 'অ্যাকাউন্ট নিষ্ক্রিয়' },
          { status: 403 }
        );
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          username: existingUser.username, 
          role: existingUser.role,
          fullName: existingUser.full_name 
        },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      // Update last login
      await db.collection('users').updateOne(
        { username },
        { $set: { last_login: new Date(), updated_at: new Date() } }
      );

      // Log the login activity
      await db.collection('audit_logs').insertOne({
        user_id: existingUser._id,
        action: 'লগইন',
        resource_type: 'user',
        resource_id: existingUser._id,
        ip_address: request.headers.get('x-forwarded-for') || 'unknown',
        user_agent: request.headers.get('user-agent') || 'unknown',
        timestamp: new Date(),
        details: { success: true }
      });

      return NextResponse.json({
        message: 'সফলভাবে লগইন হয়েছে',
        token,
        user: {
          username: existingUser.username,
          fullName: existingUser.full_name,
          role: existingUser.role,
          email: existingUser.email,
        }
      });

    } catch (dbError) {
      console.error('Database connection error, using demo auth:', dbError);
      
      // Fallback to demo authentication if database fails
      if (username === 'admin' && password === '123456') {
        const token = jwt.sign(
          { 
            username: 'admin', 
            role: 'lawyer',
            fullName: 'আইনজীবী প্রশাসক' 
          },
          process.env.JWT_SECRET || 'your-secret-key',
          { expiresIn: '24h' }
        );

        return NextResponse.json({
          message: 'সফলভাবে লগইন হয়েছে (ডেমো মোড)',
          token,
          user: {
            username: 'admin',
            fullName: 'আইনজীবী প্রশাসক',
            role: 'lawyer',
            email: 'admin@lawem.com',
          }
        });
      }
      
      return NextResponse.json(
        { message: 'ভুল ব্যবহারকারীর নাম বা পাসওয়ার্ড' },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'সার্ভার ত্রুটি' },
      { status: 500 }
    );
  }
}
